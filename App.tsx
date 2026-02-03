import React from 'react';
import { Button } from './components/Button';

const sidebarSections = [
  {
    title: '欢迎使用',
    icon: '🏠',
    items: [
      { label: '欢迎使用', active: true },
      { label: '智能客服配置' },
      { label: '常见问题与回答' },
      { label: '关键词触发回复' },
      { label: '商品信息库' }
    ]
  },
  {
    title: '微信管理',
    icon: '💬',
    items: [
      { label: '系统配置管理' },
      { label: '微信账号配置' },
      { label: '消息管理' },
      { label: '群组管理' },
      { label: '消息群发' },
      { label: '自动添加群好友' },
      { label: '统计分析' },
      { label: '文件上传管理' }
    ]
  },
  {
    title: '企业微信管理',
    icon: '🏢',
    items: [{ label: '企业微信账号' }, { label: '企业侧消息' }]
  },
  {
    title: '大模型设置',
    icon: '🧠',
    items: [{ label: '模型配置' }, { label: 'API设置' }]
  },
  {
    title: '账户与权限',
    icon: '👤',
    items: [{ label: '账号管理' }, { label: '角色权限' }]
  }
];

const quickCards = [
  {
    title: '智能客服配置',
    description: '配置FAQ、关键词触发、商品信息等智能回复能力。',
    actions: ['开始配置']
  },
  {
    title: '微信管理',
    description: '管理微信账号、消息、群组等核心功能模块。',
    actions: ['系统配置', '群组管理']
  },
  {
    title: '大模型设置',
    description: '配置AI大模型参数与fallback策略。',
    actions: ['配置模型']
  }
];

const featureCards = [
  {
    title: 'AI私信和群聊回复',
    description:
      '设置AI回复API并测试通过后，在【AI聊天】菜单开启自动回复。开启后避免键盘鼠标操作干扰。',
    tag: '默认关闭'
  },
  {
    title: 'AI朋友圈评论点赞',
    description: '内置AI能力，首页进入“朋友圈”选择评论数量与范围即可启动。',
    tag: '自动执行'
  },
  {
    title: '私聊群发',
    description: '需完成群数据库初始化（约1-10分钟），按菜单提示操作后使用。',
    tag: '可配置'
  },
  {
    title: '群聊群发',
    description: '完成好友数据库初始化，并在设置中配置触发关键词。',
    tag: '可配置'
  },
  {
    title: '自动加好友/接受好友',
    description: '在对应菜单内按提示设置策略即可执行。',
    tag: '自动化'
  },
  {
    title: '企业场景数字员工',
    description: '支持公司内外事务自动化处理，形成多能力数字员工矩阵。',
    tag: '企业级'
  }
];

const highlights = [
  '完全合法的Windows版微信机器人，核心使用RPA技术。',
  '支持标准LLM接口，兼容 DeepSeek API / Gemini API。',
  '自动加好友、批量发送、朋友圈AI评论点赞等全功能覆盖。',
  '可作为企业数字员工或个人贴身助理。'
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center">
              冰
            </div>
            <div>
              <p className="font-semibold text-sm">冰石微信智能客服系统</p>
              <p className="text-xs text-slate-400">RPA + AI 全栈能力</p>
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
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                      item.active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-100'
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
          <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-500">
            已连接AI模型
            <p className="text-lg font-semibold text-slate-900 mt-1">7 个</p>
            <Button className="mt-3 w-full text-sm" variant="secondary">
              查看接口状态
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">首页 / 欢迎使用</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              🔔
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div>
                <p className="text-sm font-semibold">系统管理员</p>
                <p className="text-xs text-slate-400">企业版</p>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 py-6">
          <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 rounded-3xl border border-slate-200 p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 text-emerald-500 flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h1 className="text-2xl font-semibold">欢迎使用 冰石微信智能客服系统</h1>
                <p className="text-sm text-slate-500 mt-1">个人微信已连接，连接的微信账号昵称：墨涵舞</p>
              </div>
            </div>
            <div className="mt-6 grid lg:grid-cols-3 gap-4">
              {quickCards.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-500 mt-2">{card.description}</p>
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
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">功能说明</h2>
                  <p className="text-xs text-slate-400">AI + RPA 全场景自动化</p>
                </div>
                <Button variant="secondary" className="text-xs px-3 py-1">
                  查看配置手册
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {featureCards.map((item) => (
                  <div key={item.title} className="border border-slate-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <h3 className="text-base font-semibold">系统亮点</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-500">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <h3 className="text-base font-semibold">快捷操作</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  {['关键词触发回复', '微信管理', '个人设置', '朋友圈评论', '群发任务', '模型调用'].map((item) => (
                    <Button key={item} variant="secondary" className="justify-start">
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <h3 className="text-base font-semibold">安全与合规</h3>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  核心采用RPA驱动方式，无侵入、合规可控；支持权限与日志审计，适配企业级部署。
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
