chrome.runtime.onInstalled.addListener(() => {
  console.log("RBLX Account Switcher | Ready");

  chrome.storage.sync.set({
    accounts: [],
  });
});

chrome.runtime.onMessage.addListener((msg, caller, sendResponse) => {
  if (
    msg.from == "switchAccountMenu" &&
    msg.whatToDo == "setCookieAndCreateTab"
  ) {
    chrome.storage.sync.get(["accounts"], function (data) {
      const foundAccount = data.accounts.find(
        (obj) => obj.username == msg.username
      );
      chrome.cookies.set({
        url: "https://*.roblox.com/*",
        httpOnly: true,
        name: ".ROBLOSECURITY",
        domain: ".roblox.com",
        value: foundAccount.cookie,
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
    });
  }

  if (msg.from == "addAccountMenu") {
    console.log(msg);
    chrome.cookies.get(
      {
        name: ".ROBLOSECURITY",
        url: "https://*.roblox.com/*",
      },
      function (cookie) {
        chrome.storage.sync.get(["accounts"], function (currentData) {
          chrome.storage.sync.set(
            {
              accounts: [
                ...currentData.accounts,
                { username: msg.username, cookie: cookie.value },
              ],
            },
            function () {
              sendResponse("SUCCESS");
            }
          );
        });
      }
    );
  }

  return true;
});

function handleSwitchAccountLoginStatus(tab2) {
  if (tab2.url == "https://www.roblox.com/home") {
    chrome.notifications.create({
      message: "Seems to have logged in successfully!",
      type: "basic",
      title: "Login successful?",
      iconUrl: "./images/A.png",
    });
  } else {
    chrome.notifications.create(
      {
        message: "Login seems to have failed. The token probably expired.",
        type: "basic",
        title: "Login failed?",
        iconUrl: "/images/A.png",
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
