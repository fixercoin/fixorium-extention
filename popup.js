// popup.js
const statusEl = document.getElementById('status');
const passwordEl = document.getElementById('password');
const unlockBtn = document.getElementById('unlock');
const actions = document.getElementById('actions');


unlockBtn.onclick = async () => {
const pwd = passwordEl.value || 'devpass';
// In a real build derive key and decrypt vault.
// For dev we store a mock public key
await chrome.storage.local.set({ unlockedPubkey: 'DevPublicKey111111111111111111111111111' });
statusEl.innerText = 'Unlocked';
actions.style.display = 'block';
};


document.getElementById('create-mock').onclick = async () => {
// store a mock signed tx so background can return it when asked
await chrome.storage.local.set({ mockSignedTx: 'MockSignedTxBase64==' });
alert('Mock signed tx stored');
};


// Approve handlers look for query params to decide what to do
const qp = new URLSearchParams(location.search);
if (qp.get('approve_connect')) {
const tabId = Number(qp.get('tabId'));
chrome.storage.local.get(['unlockedPubkey'], (res) => {
const pk = res.unlockedPubkey || null;
if (pk) chrome.tabs.sendMessage(tabId, { type: 'CONNECT_APPROVED', publicKey: pk });
window.close();
});
}
if (qp.get('approve_sign')) {
const tabId = Number(qp.get('tabId'));
chrome.storage.local.get(['mockSignedTx'], (res) => {
const signed = res.mockSignedTx || null;
if (signed) chrome.tabs.sendMessage(tabId, { type: 'SIGN_APPROVED', signedTransaction: signed });
window.close();
});
}
