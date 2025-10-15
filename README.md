# Fixorium Wallet Extension — Starter


This repository is a minimal scaffold for building a Chrome extension wallet that injects a `window.solana` provider into pages and routes connection/sign requests to the extension UI for approval.


## Development
1. Load the extension as "unpacked" in `chrome://extensions` pointing to this folder.
2. Open a test DApp page and call `window.solana.connect()` from the console.
3. Use the popup UI to simulate unlocking and approving requests.


## Next steps
- Replace dev mocks with real key generation (BIP39 or ed25519), real signing with `tweetnacl`, and real transaction serialization using `@solana/web3.js`.
- Harden vault encryption and add proper UX for approve dialogs.
- Add phishing detection, network selection, hardware wallet support.
