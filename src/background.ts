import browser from 'webextension-polyfill';

const isFirefox = chrome.runtime.getURL('').startsWith('moz-extension://');

chrome.runtime.onInstalled.addListener(() => {
  isFirefox
    ? browser.sidebarAction.setPanel({ panel: 'sidepanel.html' })
    : chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
});
