# WeChat-Vision-Bot（桌面版）

这是一个可安装部署的桌面程序（Electron + Vite + React），核心流程为：

- OCR 高频触发（低成本轮询）
- Vision 高精理解（截图理解）
- 拟人化输入发送（RPA）
- 启动即物理失忆（删除 `chat_history.db`）

## 功能概览

- 关键词回复（文字/图片/视频/知识库问答）
- 关键词表格导入/导出（CSV）
- 知识库概览表格导入/导出（CSV）
- 大模型配置（API 状态、提示词模板）
- 本地配置持久化（`config.json`）

## 1. 安装依赖

```bash
cd /workspace/-
npm install
```

## 2. 开发模式（桌面）

```bash
cd /workspace/-
npm run dev:desktop
```

## 3. 打包安装包

```bash
cd /workspace/-
npm run build:desktop
```

打包产物默认在 `dist/` 与 `dist_electron/`（由 electron-builder 生成）。

## 4. CSV 格式

### 关键词规则 CSV

文件头：

```csv
keyword,type,response
```

示例：

```csv
发资料,文字 + 图片,已为你整理资料清单，先发说明，再发配图。
看演示,视频,自动发送产品演示视频，并附带关键时间点说明。
价格,知识库问答,从知识库检索最新报价与优惠策略，生成简洁回复。
```

### 知识库概览 CSV

文件头：

```csv
label,value
```

示例：

```csv
知识库文档,236
图片素材,58
视频素材,12
```

## 5. 本地数据目录

应用会在系统 `userData` 目录下创建：

- `wechat-vision-bot/config.json`：配置文件
- `wechat-vision-bot/chat_history.db`：会话数据库（每次启动会删除）
