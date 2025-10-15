// content-script.js
// Inject the provider script into the page so DApps see it as a page script
const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/injected-provider.js');
document.documentElement.prepend(script);


// Forward messages from page to extension
window.addEventListener('message', (e) => {
if (e.source !== window) return;
const { source, payload } = e.data || {};
if (source !== 'fixorium-inpage') return;
chrome.runtime.sendMessage(payload);
});


// Listen for messages from background and forward to page
chrome.runtime.onMessage.addListener((msg) => {
window.postMessage({ source: 'fixorium-extension', payload: msg }, '*');
});
