
import React, { useState, useEffect, useRef } from 'react';
import { ModelType, Agent, KnowledgeItem, Message } from './types';
import { generateImage, chatWithAgent } from './services/geminiService';
import { Button } from './components/Button';
import { AgentCard } from './components/AgentCard';

const App: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  
  // New Agent Form State
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: '',
    description: '',
    systemInstruction: '',
    model: ModelType.FLASH,
    avatarUrl: '',
    knowledgeBase: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('omni-agents');
    if (saved) {
      try {
        setAgents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load agents", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('omni-agents', JSON.stringify(agents));
  }, [agents]);

  const handleCreateAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name || 'Unnamed Agent',
      description: newAgent.description || '',
      systemInstruction: newAgent.systemInstruction || '',
      model: newAgent.model || ModelType.FLASH,
      avatarUrl: newAgent.avatarUrl || `https://picsum.photos/seed/${Date.now()}/200/200`,
      knowledgeBase: newAgent.knowledgeBase || [],
      createdAt: Date.now()
    };
    setAgents(prev => [agent, ...prev]);
    setIsCreating(false);
    setNewAgent({
      name: '',
      description: '',
      systemInstruction: '',
      model: ModelType.FLASH,
      avatarUrl: '',
      knowledgeBase: []
    });
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(prev => prev.filter(a => a.id !== id));
    if (activeAgent?.id === id) setActiveAgent(null);
  };

  const handleGenerateAvatar = async () => {
    if (!newAgent.name && !newAgent.description) {
      alert("Please provide a name or description first.");
      return;
    }
    setIsGeneratingAvatar(true);
    try {
      const url = await generateImage(newAgent.name + " " + newAgent.description);
      setNewAgent(prev => ({ ...prev, avatarUrl: url }));
    } catch (err) {
      alert("Avatar generation failed. Please try again.");
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const newItem: KnowledgeItem = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          content,
          type: 'file'
        };
        setNewAgent(prev => ({
          ...prev,
          knowledgeBase: [...(prev.knowledgeBase || []), newItem]
        }));
      };
      reader.readAsText(file);
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !activeAgent) return;

    const userMsg: Message = { role: 'user', parts: [{ text: inputMessage }] };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setInputMessage('');
    setIsChatting(true);

    try {
      // Build full system instruction including knowledge base
      let fullInstruction = activeAgent.systemInstruction;
      if (activeAgent.knowledgeBase.length > 0) {
        const knowledgeText = activeAgent.knowledgeBase.map(k => `Source [${k.name}]:\n${k.content}`).join('\n\n');
        fullInstruction += `\n\nADDITIONAL KNOWLEDGE BASE:\n${knowledgeText}\n\nPlease use the above information to inform your responses where relevant.`;
      }

      const responseText = await chatWithAgent(updatedMessages, activeAgent.model, fullInstruction);
      setChatMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I encountered an error processing your request." }] }]);
    } finally {
      setIsChatting(false);
    }
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-slate-900">
      {/* Sidebar / List */}
      <div className={`w-full md:w-96 glass border-r border-slate-200 flex flex-col ${activeAgent && 'hidden md:flex'}`}>
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              OmniAgent
            </h1>
            <Button onClick={() => setIsCreating(true)} className="rounded-full w-10 h-10 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {agents.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium">No agents created yet.</p>
              <Button variant="ghost" className="mt-2 text-sm" onClick={() => setIsCreating(true)}>Create your first agent</Button>
            </div>
          ) : (
            agents.map(agent => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onSelect={(a) => {
                  setActiveAgent(a);
                  setChatMessages([]);
                }}
                onDelete={handleDeleteAgent}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {activeAgent ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between glass z-10 sticky top-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveAgent(null)}
                  className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <img 
                  src={activeAgent.avatarUrl} 
                  alt={activeAgent.name} 
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-50"
                />
                <div>
                  <h2 className="font-bold text-slate-900 leading-tight">{activeAgent.name}</h2>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">{activeAgent.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setChatMessages([])} title="Clear Chat">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {chatMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <img src={activeAgent.avatarUrl} className="w-20 h-20 rounded-3xl grayscale" />
                  <div>
                    <p className="text-xl font-medium">Hello! I'm {activeAgent.name}</p>
                    <p className="text-sm max-w-xs mx-auto mt-2">{activeAgent.description}</p>
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-slate-100 text-slate-800'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
                  </div>
                </div>
              ))}
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl p-4 flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-100 sticky bottom-0">
              <div className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message ${activeAgent.name}...`}
                  className="flex-1 bg-transparent border-none focus:ring-0 p-3 max-h-40 resize-none min-h-[44px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!inputMessage.trim() || isChatting}
                  className="rounded-xl h-11 w-11 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </Button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">Gemini may display inaccurate info, so double-check its responses.</p>
            </div>
          </>
        ) : !isCreating ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-12">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Choose an Agent to start</h2>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">Create specialized assistants for coding, writing, research, or just for fun.</p>
            </div>
            <Button onClick={() => setIsCreating(true)} className="px-8 py-3 rounded-2xl text-lg shadow-xl shadow-indigo-100">
              Create New Agent
            </Button>
          </div>
        ) : null}

        {/* Creation Overlay */}
        {isCreating && (
          <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Create Intelligent Agent</h2>
                <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 space-y-4">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 relative group">
                      {newAgent.avatarUrl ? (
                        <img src={newAgent.avatarUrl} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-[10px] text-slate-400">Avatar</p>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="secondary" 
                      onClick={handleGenerateAvatar} 
                      className="w-full text-xs" 
                      isLoading={isGeneratingAvatar}
                    >
                      AI Generate
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Agent Name</label>
                      <input 
                        type="text" 
                        value={newAgent.name}
                        onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                        placeholder="e.g. Marketing Guru"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description</label>
                      <input 
                        type="text" 
                        value={newAgent.description}
                        onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                        placeholder="Help me write ad copy and social posts"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">System Instructions (Personality & Constraints)</label>
                  <textarea 
                    value={newAgent.systemInstruction}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, systemInstruction: e.target.value }))}
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 h-32 resize-none"
                    placeholder="You are a professional copywriter with a friendly but professional tone..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Intelligence Model</label>
                    <select 
                      value={newAgent.model}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, model: e.target.value as ModelType }))}
                      className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                    >
                      <option value={ModelType.FLASH}>Gemini 3 Flash (Fast & Lean)</option>
                      <option value={ModelType.PRO}>Gemini 3 Pro (Deep Reasoning)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Knowledge Base</label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl px-4 py-2 hover:bg-slate-50 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span className="text-sm text-slate-500">Upload Text/Markdown</span>
                          <input type="file" className="hidden" accept=".txt,.md" multiple onChange={handleFileUpload} />
                        </div>
                      </label>
                    </div>
                    {newAgent.knowledgeBase && newAgent.knowledgeBase.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {newAgent.knowledgeBase.map((k) => (
                          <div key={k.id} className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg flex items-center gap-1 group">
                             {k.name}
                             <button onClick={() => setNewAgent(p => ({ ...p, knowledgeBase: p.knowledgeBase?.filter(ki => ki.id !== k.id)}))} className="text-slate-400 hover:text-red-500">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <Button variant="ghost" onClick={() => setIsCreating(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleCreateAgent} className="flex-1 h-12 text-lg">Create Agent</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
