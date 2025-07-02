// src/background.ts - MV3 Service Worker
chrome.runtime.onInstalled.addListener(() => {
  // 把“点击扩展图标”与 side panel 绑定
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
});
