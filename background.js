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

chrome.runtime.onMessage.addListener(async (msg) => {
  if (
    msg.from == "switchAccountMenu" &&
    msg.whatToDo == "setCookieAndCreateTab"
  ) {
    chrome.cookies.set({
      url: "https://*.roblox.com/*",
      httpOnly: true,
      name: ".ROBLOSECURITY",
      domain: ".roblox.com",
    });
    chrome.tabs.create(
      {
        url: "https://roblox.com",
        selected: true,
      },
      function (tab) {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab2) => {
          if (tabId == tab.id && changeInfo.status == "complete") {
            handleSwitchAccountLoginStatus(tab2);
          }
        });
      }
    );
  }
});

function handleSwitchAccountLoginStatus(tab2) {
  if (tab2.url == "https://www.roblox.com/home") {
    chrome.notifications.create(
      {
        message: "Seems to have logged in successfully!",
        type: "basic",
        title: "Login successful?",
        iconUrl: "./A.png",
      },
      function (id) {
        console.log(id, "logged in");
      }
    );
  } else {
    chrome.notifications.create(
      {
        message: "Login seems to have failed. The token probably expired.",
        type: "basic",
        title: "Login failed?",
        iconUrl: "/A.png",
      },
      function (id) {
        console.log(id, "not logged in");
      }
    );
  }
}

function getCurrentUserInfo() {
  chrome.cookies.get(
    {
      name: ".ROBLOSECURITY",
      url: "https://*.roblox.com/*",
    },
    function (cookie) {
      alert(JSON.stringify(cookie));
    }
  );
}
