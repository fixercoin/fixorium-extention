// background.js
importScripts(); // no-op placeholder for some bundlers; MV3 supports modules in service_worker


let unlockedPublicKey = null;


chrome.runtime.onMessage.addListener((msg, sender) => {
console.log('background got message', msg, 'from', sender);
if (msg.type === 'CONNECT_REQUEST') {
// For simple dev flow: auto-approve when extension unlocked. In production open approval UI.
chrome.storage.local.get(['unlockedPubkey'], (res) => {
const pk = res.unlockedPubkey || null;
if (pk) {
chrome.tabs.sendMessage(sender.tab.id, { type: 'CONNECT_APPROVED', publicKey: pk });
} else {
// open popup to let user unlock/approve
chrome.windows.create({
url: chrome.runtime.getURL('src/popup.html') + '?approve_connect=1&tabId=' + sender.tab.id,
type: 'popup', width: 420, height: 720
});
}
});
}


if (msg.type === 'SIGN_TRANSACTION') {
// In a real implementation, open a confirmation UI and sign with private key only after user approval
chrome.storage.local.get(['mockSignedTx'], (res) => {
const signed = res.mockSignedTx || null;
if (signed) {
chrome.tabs.sendMessage(sender.tab.id, { type: 'SIGN_APPROVED', signedTransaction: signed });
} else {
chrome.windows.create({
url: chrome.runtime.getURL('src/popup.html') + '?approve_sign=1&tabId=' + sender.tab.id,
type: 'popup', width: 420, height: 720
});
}
});
}
});
