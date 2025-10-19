document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("openWallet");
  if (button) {
    button.addEventListener("click", () => {
      if (chrome && chrome.tabs) {
        chrome.tabs.create({ url: "https://wallet.fixorium.com.pk" });
      } else {
        window.open("https://wallet.fixorium.com.pk", "_blank");
      }
    });
  }
});
