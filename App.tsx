import React from 'react';
import { Button } from './components/Button';

const sidebarSections = [
  {
    title: '项目导航',
    icon: '🧭',
    items: [
      { label: '总览', active: true },
      { label: '双核驱动架构' },
      { label: '触发规则中心' },
      { label: 'Vision 推理记录' }
    ]
  },
  {
    title: '自动化执行',
    icon: '🤖',
    items: [
      { label: '屏幕轮询状态' },
      { label: '聊天区域锚点' },
      { label: '拟人输入策略' },
      { label: '发送节奏控制' }
    ]
  },
  {
    title: '记忆与人设',
    icon: '🧠',
    items: [{ label: '会话记忆管理' }, { label: '负面提示词策略' }]
  },
  {
    title: '系统与日志',
    icon: '🛡️',
    items: [{ label: '审计日志' }, { label: '运行参数' }]
  }
];

const quickCards = [
  {
    title: '轻量级触发（OCR）',
    description: '本地 OCR 高频轮询仅用于识别“画面变动”与“触发关键词”，降低 Vision API 调用成本。',
    actions: ['配置轮询间隔', '设置关键词']
  },
  {
    title: '重量级理解（Vision）',
    description: '触发后截图上传至豆包 Vision Pro，结合 UI 排版与文字内容进行多模态理解。',
    actions: ['测试 Vision', '查看示例截图']
  },
  {
    title: '拟人化执行链路',
    description: '严格遵循“看屏幕 -> 思考 -> 模拟打字”的人类操作逻辑，避免 API 直发行为特征。',
    actions: ['输入节奏预览']
  }
];

const featureCards = [
  {
    title: '双核驱动调度器',
    description: '轻量 OCR 做触发，重量 Vision 做理解，保证实时性与准确性兼得。',
    tag: '核心能力'
  },
  {
    title: '物理失忆机制',
    description: '每次启动先物理删除 chat_history.db，再创建全新 SQLite，避免历史“AI 味”污染。',
    tag: '默认开启'
  },
  {
    title: '拟人化打字模型',
    description: '通过 pyautogui + pyperclip 模拟快捷键与打字延迟，执行更接近真实人工。',
    tag: '反审计优化'
  },
  {
    title: '负面提示词约束',
    description: '屏蔽过度表情、波浪号与客服话术，输出风格更自然、更像真人。',
    tag: 'Prompt 调优'
  }
];

const runtimeFlow = [
  '① OCR 轮询聊天窗口，检测新消息与触发关键词。',
  '② 触发后裁剪聊天区域截图，上传给豆包 Vision Pro。',
  '③ Vision 输出意图理解 + 回复草案。',
  '④ 本地规则层二次过滤语气与敏感表达。',
  '⑤ pyautogui 执行粘贴、延迟、发送，完成拟人化回复。'
];


const keywordReplyRules = [
  {
    keyword: '发资料',
    type: '文字 + 图片',
    response: '已为你整理资料清单，先发说明，再发配图。'
  },
  {
    keyword: '看演示',
    type: '视频',
    response: '自动发送产品演示视频，并附带关键时间点说明。'
  },
  {
    keyword: '价格',
    type: '知识库问答',
    response: '从知识库检索最新报价与优惠策略，生成简洁回复。'
  }
];

const knowledgeBaseOverview = [
  { label: '知识库文档', value: '236' },
  { label: '图片素材', value: '58' },
  { label: '视频素材', value: '12' }
];


const tableActions = [
  '上传关键词表格',
  '导出关键词表格',
  '上传知识库表格',
  '导出知识库表格'
];

const modelConfigItems = [
  { label: '模型提供方', value: '豆包 Vision Pro + Chat' },
  { label: 'API Key', value: '已配置（可轮换）' },
  { label: '提示词模板', value: '3 套（客服/销售/运营）' }
];

const promptRules = ['禁用夸张语气词', '禁用连续表情', '保留简洁口语风格'];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900 flex">
      <aside className="w-72 bg-white border-r border-[#e9ecef] flex flex-col">
        <div className="px-5 py-4 border-b border-[#f1f2f4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#07c160] text-white font-bold flex items-center justify-center shadow-sm">
              微
            </div>
            <div>
              <p className="font-semibold text-sm tracking-tight">WeChat-Vision-Bot</p>
              <p className="text-xs text-slate-400">微信风格控制台</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs text-slate-400 px-2 mb-2 flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                      item.active
                        ? 'bg-[#e9f9ef] text-[#07c160] font-medium border border-[#b8ebcb]'
                        : 'text-slate-600 hover:bg-[#f6f7f9]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <div className="bg-[#f7f8fa] rounded-2xl p-4 text-xs text-slate-500 border border-[#eceff3]">
            当前运行模式
            <p className="text-lg font-semibold text-slate-900 mt-1">双核协同</p>
            <Button className="mt-3 w-full text-sm" variant="secondary">
              查看运行日志
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-[#eef0f3] flex items-center justify-between px-6">
          <div>
            <span className="text-sm text-slate-400">首页 / WeChat-Vision-Bot</span>
            <h1 className="text-base font-semibold text-slate-800 mt-0.5">智能消息处理工作台</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#e9f9ef] text-[#07c160] border border-[#b8ebcb]">
              在线
            </span>
            <Button variant="secondary" className="text-xs px-3 py-1">
              导出配置
            </Button>
          </div>
        </header>

        <section className="px-6 py-6">
          <div className="bg-white rounded-3xl border border-[#e9ecef] p-8 shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">协议零入侵的微信智能桌面助手</h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-3xl">
                  本方案放弃协议层注入，转向纯视觉 + RPA 行为链路：以 OCR 做低成本触发，以 Vision 做高精度理解，再用拟人化输入完成回复。
                </p>
              </div>
              <div className="bg-[#f7f8fa] border border-[#eceff3] rounded-2xl px-4 py-3 min-w-56">
                <p className="text-xs text-slate-500">今日处理会话</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">128</p>
                <p className="text-xs text-[#07c160] mt-1">较昨日 +12%</p>
              </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-3 gap-4">
              {quickCards.map((card) => (
                <div key={card.title} className="bg-[#fafbfc] rounded-2xl border border-[#eceff3] p-5 hover:border-[#b8ebcb] transition-colors">
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.description}</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {card.actions.map((action) => (
                      <Button key={action} variant="secondary" className="text-xs px-3 py-1">
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">硬核技术实现</h2>
                  <p className="text-xs text-slate-400">双核驱动 + 物理失忆 + 拟人化控制</p>
                </div>
                <Button variant="secondary" className="text-xs px-3 py-1">
                  查看架构图
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {featureCards.map((item) => (
                  <div key={item.title} className="border border-[#eceff3] bg-[#fcfcfd] rounded-2xl p-4 hover:border-[#d9dee5] transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                      <span className="text-[10px] text-[#07c160] bg-[#e9f9ef] px-2 py-1 rounded-full border border-[#b8ebcb]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
                <h3 className="text-base font-semibold">运行流程（人类操作逻辑）</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {runtimeFlow.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#07c160]">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">关键词回复</h3>
                  <span className="text-[10px] text-[#07c160] bg-[#e9f9ef] px-2 py-1 rounded-full border border-[#b8ebcb]">
                    文字/图片/视频/知识库
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {keywordReplyRules.map((rule) => (
                    <div key={rule.keyword} className="rounded-2xl border border-[#edf0f4] bg-[#fafbfc] p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-800">关键词：{rule.keyword}</p>
                        <span className="text-[10px] text-slate-500">{rule.type}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{rule.response}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {knowledgeBaseOverview.map((item) => (
                    <div key={item.label} className="rounded-xl border border-[#edf0f4] bg-[#f7f8fa] p-2 text-center">
                      <p className="text-[10px] text-slate-500">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-800 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {tableActions.map((item) => (
                    <Button key={item} variant="secondary" className="text-xs px-2 py-1.5">
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">大模型配置</h3>
                  <span className="text-[10px] text-[#07c160] bg-[#e9f9ef] px-2 py-1 rounded-full border border-[#b8ebcb]">
                    API + 提示词
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {modelConfigItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs border border-[#edf0f4] rounded-xl px-3 py-2 bg-[#fafbfc]">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-slate-800 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {promptRules.map((item) => (
                    <span key={item} className="text-[10px] text-slate-600 bg-[#f3f4f6] border border-[#e5e7eb] px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button variant="secondary" className="text-xs px-2 py-1.5">配置 API</Button>
                  <Button variant="secondary" className="text-xs px-2 py-1.5">编辑提示词</Button>
                  <Button variant="secondary" className="text-xs px-2 py-1.5">联调测试</Button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
                <h3 className="text-base font-semibold">启动策略</h3>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  每次应用重启都会先删除 chat_history.db，确保模型记忆“物理失忆”，保持人设纯净并降低历史语气漂移。
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-[#e9ecef] p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)]">
                <h3 className="text-base font-semibold">输出风格约束</h3>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  通过负面提示词禁止过度表情、波浪号和模板化客服表达，让回复保持自然、简洁、可信。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
