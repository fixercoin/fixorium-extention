// injected-provider.js
(function () {
if (window.solana && window.solana.isFixorium) return;


const sendToExtension = (msg) => window.postMessage({ source: 'fixorium-inpage', payload: msg }, '*');


window.solana = {
isFixorium: true,
isConnected: false,
publicKey: null,


async connect() {
sendToExtension({ type: 'CONNECT_REQUEST' });
return new Promise((resolve, reject) => {
function onMessage(e) {
const { source, payload } = e.data || {};
if (source !== 'fixorium-extension') return;
if (payload?.type === 'CONNECT_APPROVED') {
window.removeEventListener('message', onMessage);
this.isConnected = true;
this.publicKey = payload.publicKey;
resolve({ publicKey: payload.publicKey });
}
if (payload?.type === 'CONNECT_REJECTED') {
window.removeEventListener('message', onMessage);
reject(new Error('User rejected connection'));
}
}
window.addEventListener('message', onMessage.bind(this));
});
},


async signTransaction(serializedTxBase64) {
sendToExtension({ type: 'SIGN_TRANSACTION', transaction: serializedTxBase64 });
return new Promise((resolve, reject) => {
function onMessage(e) {
const { source, payload } = e.data || {};
if (source !== 'fixorium-extension') return;
if (payload?.type === 'SIGN_APPROVED') {
window.removeEventListener('message', onMessage);
resolve(payload.signedTransaction);
}
if (payload?.type === 'SIGN_REJECTED') {
window.removeEventListener('message', onMessage);
reject(new Error('User rejected signing'));
}
}
window.addEventListener('message', onMessage);
});
}
};
})();
