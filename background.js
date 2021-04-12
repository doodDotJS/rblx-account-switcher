chrome.runtime.onInstalled.addListener(() => {
  console.log("RBLX Account Switcher | Ready");
  chrome.storage.sync.set({ accounts: [] });
});
