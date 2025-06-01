// 预加载脚本，用于在渲染进程中安全地暴露Node.js API
const { contextBridge, ipcRenderer } = require('electron');

// 暴露一些API给渲染进程
contextBridge.exposeInMainWorld('electron', {
  // 可以在这里添加一些与主进程通信的方法
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  // 其他可能需要的方法
});