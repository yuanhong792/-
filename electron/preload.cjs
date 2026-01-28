const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('appEnv', {
  mode: process.env.NODE_ENV || 'production'
});
