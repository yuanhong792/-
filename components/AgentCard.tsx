
import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  onDelete: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, onDelete }) => {
  return (
    <div 
      onClick={() => onSelect(agent)}
      className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
          <img 
            src={agent.avatarUrl || `https://picsum.photos/seed/${agent.id}/100/100`} 
            alt={agent.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-lg truncate">{agent.name}</h3>
          <p className="text-slate-500 text-sm line-clamp-2 mt-1 leading-relaxed">
            {agent.description || 'No description provided.'}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
              {agent.model.split('-')[1]}
            </span>
            {agent.knowledgeBase.length > 0 && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                {agent.knowledgeBase.length} Source{agent.knowledgeBase.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (confirm('Are you sure you want to delete this agent?')) {
            onDelete(agent.id);
          }
        }}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
