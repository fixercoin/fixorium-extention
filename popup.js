document.addEventListener("DOMContentLoaded", () => {
  const frame = document.getElementById("walletFrame");
  const backBtn = document.getElementById("backBtn");
  const reloadBtn = document.getElementById("reloadBtn");

  // Reload iframe
  reloadBtn.addEventListener("click", () => {
    frame.contentWindow.location.reload();
  });

  // Go back in iframe history (if supported)
  backBtn.addEventListener("click", () => {
    frame.contentWindow.history.back();
  });
});
