const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const APP_DIR = 'wechat-vision-bot';
const CONFIG_FILE = 'config.json';
const HISTORY_FILE = 'chat_history.db';

function getAppDataDir() {
  const dir = path.join(app.getPath('userData'), APP_DIR);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getConfigPath() {
  return path.join(getAppDataDir(), CONFIG_FILE);
}

function getHistoryPath() {
  return path.join(getAppDataDir(), HISTORY_FILE);
}

function getDefaultConfig() {
  return {
    keywordRules: [
      { keyword: '发资料', type: '文字 + 图片', response: '已为你整理资料清单，先发说明，再发配图。' },
      { keyword: '看演示', type: '视频', response: '自动发送产品演示视频，并附带关键时间点说明。' },
      { keyword: '价格', type: '知识库问答', response: '从知识库检索最新报价与优惠策略，生成简洁回复。' }
    ],
    knowledgeBaseOverview: [
      { label: '知识库文档', value: '236' },
      { label: '图片素材', value: '58' },
      { label: '视频素材', value: '12' }
    ],
    modelConfig: {
      provider: '豆包 Vision Pro + Chat',
      apiKeyStatus: '未配置',
      promptTemplates: '0 套'
    }
  };
}

function loadConfig() {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    const config = getDefaultConfig();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return config;
  }

  const content = fs.readFileSync(configPath, 'utf-8');
  return { ...getDefaultConfig(), ...JSON.parse(content) };
}

function saveConfig(config) {
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2), 'utf-8');
}

function parseCsv(content) {
  const rows = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(',').map((c) => c.trim()));
  if (rows.length === 0) return [];
  const [header, ...body] = rows;
  return body.map((row) => {
    const obj = {};
    header.forEach((h, idx) => {
      obj[h] = row[idx] || '';
    });
    return obj;
  });
}

function toCsv(header, rows) {
  const lines = [header.join(',')];
  rows.forEach((row) => {
    lines.push(header.map((h) => `${String(row[h] ?? '')}`).join(','));
  });
  return lines.join('\n');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 920,
    minWidth: 1200,
    minHeight: 760,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  const historyPath = getHistoryPath();
  if (fs.existsSync(historyPath)) fs.rmSync(historyPath, { force: true });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('config:load', async () => loadConfig());

ipcMain.handle('config:model:update', async (_event, modelConfig) => {
  const config = loadConfig();
  config.modelConfig = { ...config.modelConfig, ...modelConfig };
  saveConfig(config);
  return config;
});

ipcMain.handle('keyword:import', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'CSV', extensions: ['csv'] }],
    properties: ['openFile']
  });
  if (result.canceled || result.filePaths.length === 0) return loadConfig();

  const content = fs.readFileSync(result.filePaths[0], 'utf-8');
  const rules = parseCsv(content).map((item) => ({
    keyword: item.keyword || '',
    type: item.type || '',
    response: item.response || ''
  }));

  const config = loadConfig();
  config.keywordRules = rules;
  saveConfig(config);
  return config;
});

ipcMain.handle('keyword:export', async () => {
  const config = loadConfig();
  const result = await dialog.showSaveDialog({ defaultPath: 'keyword_rules.csv' });
  if (result.canceled || !result.filePath) return false;
  const csv = toCsv(['keyword', 'type', 'response'], config.keywordRules);
  fs.writeFileSync(result.filePath, csv, 'utf-8');
  return true;
});

ipcMain.handle('kb:import', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'CSV', extensions: ['csv'] }],
    properties: ['openFile']
  });
  if (result.canceled || result.filePaths.length === 0) return loadConfig();

  const content = fs.readFileSync(result.filePaths[0], 'utf-8');
  const overview = parseCsv(content).map((item) => ({
    label: item.label || '',
    value: item.value || '0'
  }));

  const config = loadConfig();
  config.knowledgeBaseOverview = overview;
  saveConfig(config);
  return config;
});

ipcMain.handle('kb:export', async () => {
  const config = loadConfig();
  const result = await dialog.showSaveDialog({ defaultPath: 'knowledge_overview.csv' });
  if (result.canceled || !result.filePath) return false;
  const csv = toCsv(['label', 'value'], config.knowledgeBaseOverview);
  fs.writeFileSync(result.filePath, csv, 'utf-8');
  return true;
});
