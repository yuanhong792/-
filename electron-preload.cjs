const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('botAPI', {
  loadConfig: () => ipcRenderer.invoke('config:load'),
  updateModelConfig: (payload) => ipcRenderer.invoke('config:model:update', payload),
  importKeywordCsv: () => ipcRenderer.invoke('keyword:import'),
  exportKeywordCsv: () => ipcRenderer.invoke('keyword:export'),
  importKnowledgeCsv: () => ipcRenderer.invoke('kb:import'),
  exportKnowledgeCsv: () => ipcRenderer.invoke('kb:export')
});
