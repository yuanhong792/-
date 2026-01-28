import React, { useMemo, useState } from 'react';
import { Button } from './components/Button';

const modelGroups = {
  '国内模型': [
    { name: '通义千问', vendor: '阿里云', tag: '文本/多模态' },
    { name: '文心一言', vendor: '百度', tag: '企业级' },
    { name: '讯飞星火', vendor: '科大讯飞', tag: '知识增强' },
    { name: 'GLM-4', vendor: '智谱', tag: '推理' },
    { name: 'DeepSeek', vendor: '深度求索', tag: '长上下文' }
  ],
  '海外模型': [
    { name: 'ChatGPT-4o', vendor: 'OpenAI', tag: '旗舰' },
    { name: 'Gemini 1.5', vendor: 'Google', tag: '多模态' },
    { name: 'Claude 3.5', vendor: 'Anthropic', tag: '代码/写作' },
    { name: 'Llama 3.1', vendor: 'Meta', tag: '开源' }
  ]
};

const categoryTabs = ['全部', '增长获客', '营销内容', '客服支持', '企业管理', '研发协作'];
const capabilityCards = [
  {
    title: '智能体搭建',
    description: '拖拽式编排、角色设定、工具调用，10分钟完成落地。',
    accent: 'from-indigo-500 to-sky-400'
  },
  {
    title: '多模型路由',
    description: '国内+海外模型一站聚合，按成本/能力智能切换。',
    accent: 'from-emerald-500 to-cyan-400'
  },
  {
    title: '知识库接入',
    description: '支持文档、网页、表格快速入库，闭环私域知识。',
    accent: 'from-orange-400 to-rose-400'
  },
  {
    title: '安全与合规',
    description: '权限分级、日志审计、数据脱敏，满足企业合规。',
    accent: 'from-violet-500 to-purple-400'
  }
];
const personaOptions = [
  {
    id: 'builder',
    name: '增长策划师',
    description: '擅长获客路径与转化优化。',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'support',
    name: '服务运营官',
    description: '标准化客服话术与工单流转。',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'researcher',
    name: '行业研究员',
    description: '擅长结构化报告与洞察总结。',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'creator',
    name: '内容导演',
    description: '产出短视频脚本与营销内容。',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80'
  }
];
const knowledgeBases = [
  {
    name: '品牌手册 2024',
    type: 'PDF · 126 页',
    status: '已同步',
    accent: 'bg-emerald-50 text-emerald-600'
  },
  {
    name: 'FAQ 话术库',
    type: '表格 · 2,480 条',
    status: '持续更新',
    accent: 'bg-indigo-50 text-indigo-600'
  },
  {
    name: '渠道增长策略',
    type: 'Notion · 18 篇',
    status: '待发布',
    accent: 'bg-orange-50 text-orange-600'
  }
];
const modelOptions = [
  { id: 'glm', name: 'GLM-4 Turbo', desc: '适合复杂推理', badge: '国内' },
  { id: 'qwen', name: '通义千问 MAX', desc: '长文本分析', badge: '国内' },
  { id: 'gpt4o', name: 'GPT-4o', desc: '多模态旗舰', badge: '海外' },
  { id: 'claude', name: 'Claude 3.5', desc: '写作与代码', badge: '海外' }
];
const agentCards = [
  {
    title: '朋友圈互动王',
    description: '自动生成互动文案，提升客户参与度。',
    role: '私域运营',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    title: '竞品洞察官',
    description: '抓取竞品动态，生成对比分析与策略建议。',
    role: '市场洞察',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  },
  {
    title: '爆款脚本拆解师',
    description: '拆解短视频脚本结构，输出可执行脚本。',
    role: '内容创意',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80'
  },
  {
    title: '会议纪要官',
    description: '语音转写+行动项提取，一键沉淀会议结论。',
    role: '办公效率',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
  },
  {
    title: '企业知识管家',
    description: 'FAQ知识库自动更新，客服知识随问随用。',
    role: '企业助手',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
  },
  {
    title: '全域运营策划师',
    description: '生成活动策划与执行节奏，拉动转化。',
    role: '营销策划',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categoryTabs[0]);
  const [selectedPersona, setSelectedPersona] = useState(personaOptions[0].id);
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
  const [promptText, setPromptText] = useState('');
  const modelSections = useMemo(() => Object.entries(modelGroups), []);
  const selectedPersonaData = personaOptions.find((persona) => persona.id === selectedPersona);
  const selectedModelData = modelOptions.find((model) => model.id === selectedModel);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">AI</div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold">极石智能体平台</p>
            <p className="text-xs text-slate-400">多模型中枢</p>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {['首页', 'AI问答', '智能体中心', '训练中心', '企业知识库', '用量监控'].map((item) => (
            <button
              key={item}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                item === '智能体中心' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px]">●</span>
              <span className="hidden lg:inline">{item}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 pb-4 hidden lg:block">
          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-xs text-slate-400">已接入模型</p>
            <p className="text-2xl font-bold text-slate-900">18+</p>
            <Button className="mt-3 w-full text-sm">升级企业版</Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              全部模型正常
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-xs text-indigo-600">
              今日调用 12,980 次
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-500">多租户</button>
            <button className="px-3 py-1 rounded-full bg-indigo-600 text-xs text-white">开启会员</button>
            <div className="w-9 h-9 rounded-full bg-slate-200"></div>
          </div>
        </header>

        <section className="px-6 py-6 lg:px-10">
          <div className="bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <p className="text-sm font-semibold text-indigo-600 mb-2">企业级智能体操作系统</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                AI不是工具，是你的合伙人
              </h1>
              <p className="text-sm text-slate-500 mt-4">
                一站接入国内外顶级大模型，支持低代码智能体搭建、知识库管理与多端部署。
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-white rounded-2xl px-4 py-3 border border-slate-200 flex items-center gap-2">
                  <span className="text-slate-400 text-sm">🔍</span>
                  <input
                    className="flex-1 text-sm outline-none"
                    placeholder="搜索智能体 / 业务场景 / 模型"
                  />
                </div>
                <Button className="rounded-2xl px-6">创建智能体</Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['智能体', 'AI绘画', 'AI文案', 'AI视频'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/60 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:block absolute right-10 bottom-0 w-72 h-48 bg-white/60 rounded-3xl border border-white/50 shadow-lg"></div>
          </div>
        </section>

        <section className="px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">智能体镜像工坊</h2>
                  <p className="text-xs text-slate-400">配置提示词、知识库与模型路由</p>
                </div>
                <button className="text-xs text-indigo-500">保存为模板</button>
              </div>
              <div className="mt-5 space-y-5">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>角色提示词</span>
                    <span>建议 120-240 字</span>
                  </div>
                  <textarea
                    className="mt-3 w-full bg-transparent text-sm text-slate-700 outline-none resize-none"
                    rows={4}
                    placeholder="例如：你是一个负责企业增长的策略助手，需要根据产品生命周期输出渠道组合与行动清单。"
                    value={promptText}
                    onChange={(event) => setPromptText(event.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">模型路由</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {modelOptions.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`text-left border rounded-2xl px-4 py-3 transition ${
                          selectedModel === model.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-indigo-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800">{model.name}</p>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                            {model.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{model.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">知识库</p>
                  <div className="space-y-3">
                    {knowledgeBases.map((kb) => (
                      <div
                        key={kb.name}
                        className="flex items-center justify-between border border-slate-200 rounded-2xl px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{kb.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{kb.type}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full ${kb.accent}`}>{kb.status}</span>
                      </div>
                    ))}
                    <button className="w-full border border-dashed border-slate-300 rounded-2xl px-4 py-3 text-xs text-slate-400">
                      + 上传知识库 / 连接网页
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">头像与身份</h3>
                    <p className="text-xs text-slate-400">可一键生成专属头像</p>
                  </div>
                  <button className="text-xs text-indigo-500">AI生成</button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {personaOptions.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => setSelectedPersona(persona.id)}
                      className={`border rounded-2xl p-3 text-left transition ${
                        selectedPersona === persona.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-12 h-12 rounded-2xl object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{persona.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{persona.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 p-6">
                <h3 className="text-base font-semibold text-slate-900">发布预览</h3>
                <p className="text-xs text-slate-400 mt-1">自动生成多渠道发布包</p>
                <div className="mt-4 space-y-3">
                  {['网页小组件', '企微机器人', 'App 内嵌'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3"
                    >
                      <span className="text-sm text-slate-600">{item}</span>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-400">待配置</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">实时预览</p>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                      {selectedPersonaData ? (
                        <img
                          src={selectedPersonaData.avatar}
                          alt={selectedPersonaData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {selectedPersonaData?.name ?? '未选择身份'}
                          </p>
                          <p className="text-xs text-slate-400">{selectedPersonaData?.description}</p>
                        </div>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-400">
                          {selectedModelData?.name ?? '未选择模型'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 bg-white rounded-2xl p-3">
                        {promptText.trim().length > 0
                          ? promptText
                          : '这里会展示你填写的提示词内容，方便快速预览智能体镜像效果。'}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {knowledgeBases.map((kb) => (
                          <span
                            key={kb.name}
                            className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-400"
                          >
                            {kb.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-5 w-full text-sm">生成发布包</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 mb-6">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">模型生态</h2>
                  <p className="text-xs text-slate-400">支持多模型路由与成本控制</p>
                </div>
                <button className="text-xs text-indigo-500">查看全部</button>
              </div>
              <div className="space-y-4">
                {modelSections.map(([title, items]) => (
                  <div key={title}>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{title}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map((model) => (
                        <div
                          key={model.name}
                          className="border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{model.name}</p>
                            <p className="text-xs text-slate-400">{model.vendor}</p>
                          </div>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                            {model.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {capabilityCards.map((card) => (
                <div key={card.title} className="bg-white rounded-3xl border border-slate-100 p-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.accent} mb-3`}></div>
                  <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 lg:px-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">热门智能体</h2>
              <p className="text-xs text-slate-400">覆盖营销、客服、研发等场景</p>
            </div>
            <button className="text-xs text-indigo-500">查看全部</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentCards.map((agent) => (
              <div key={agent.title} className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  <img src={agent.avatar} alt={agent.title} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{agent.title}</p>
                    <p className="text-xs text-slate-400">{agent.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 flex-1">{agent.description}</p>
                <Button className="mt-4 h-9 text-sm">开始对话</Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
