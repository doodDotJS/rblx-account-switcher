chrome.runtime.onInstalled.addListener(() => {
  console.log("RBLX Account Switcher | Ready");
  chrome.storage.sync.set({
    accounts: [
      {
        username: "dudeSafiyur1234",
        userId: 1234567890,
        cookie: "WARNINIGN BLAHJDSMDSVDHJB",
      },
    ],
  });
});

function getCurrentUserInfo() {
  chrome.cookies.get(
    {
      name: ".ROBLOSECURITY",
      url: "https://www.roblox.com/*",
    },
    function (cookie) {
      alert(JSON.stringify(cookie));
    }
  );
}
