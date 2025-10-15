// crypto.js
export async function deriveKeyFromPassword(password, salt) {
const enc = new TextEncoder();
const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt || new Uint8Array(16), iterations: 250000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt','decrypt']);
return key;
}


export async function encryptData(key, data) {
const iv = crypto.getRandomValues(new Uint8Array(12));
const enc = new TextEncoder();
const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(data)));
return { iv: Array.from(iv), ct: Array.from(new Uint8Array(ct)) };
}


export async function decryptData(key, ivArr, ctArr) {
const iv = new Uint8Array(ivArr);
const ct = new Uint8Array(ctArr).buffer;
const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
const decStr = new TextDecoder().decode(dec);
return JSON.parse(decStr);
}
