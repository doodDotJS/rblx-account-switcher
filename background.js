chrome.runtime.onInstalled.addListener(() => {
  console.log("RBLX Account Switcher | Ready");
  chrome.storage.sync.set({
    accounts: [
      {
        username: "dudeSafiyur1234",
        userId: 1234567890,
        cookie:
          "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_E2EC32E0493F9FD2B9C5657303BAD2663906213293FDB58DB9020555465B22634B4041294FFADC73615FAFA88D9A0804F7766E8933A38F82908CA7DFDCF1764C26DB10F9479823DE2587E7496B5B30E0D7E40487CF6778B6331C79527DFA8CBF3CFE4AF30E1ECC26D2EFD759520A3AD69FDC8E5CEED8F41805A6D78E03E378E79310A6572FDB60A695363DF87594C2C79EDB2D6EBBB37BEF45586F33ADA3DFE281C2866E55750DA41AF2CBFEE6D1B0274BE1D3D1DE2756AD8C84948C7A5EAC2D5C4E5D56813168472FDB476E9E99F5BFFACF3C87FEFEF83019F4384C1BC60C7BBBF96CE5E432AD439699762B56DAF32D8065F38F7159306E61E40664E2021D3A0EF70525D03AD4E147FCCC299CE69F57AFA3A92FB81FB0AEABAA64EA23F624F68C482F40052AC2A36AE95AEF91626655F107E78B",
      },
    ],
  });
});

chrome.runtime.onMessage.addListener(async (msg) => {
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
});

function handleSwitchAccountLoginStatus(tab2) {
  if (tab2.url == "https://www.roblox.com/home") {
    chrome.notifications.create({
      message: "Seems to have logged in successfully!",
      type: "basic",
      title: "Login successful?",
      iconUrl: "./A.png",
    });
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
