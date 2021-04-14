chrome.runtime.onInstalled.addListener(() => {
  console.log("RBLX Account Switcher | Ready");
  chrome.storage.sync.set({
    accounts: [
      {
        username: "dudeSafiyur1234",
        cookie:
          "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.HEU3YJMDHJH2GH UR MUM ",
      },
    ],
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
    sendResponse({ response: "hi" });

    axios({
      method: "get",
      url: "https://random-data-api.com/api/users/random_user",
    }).then((res) => {
      console.log(res);
    });

    (async () => {
      console.log("async func");
      const res = await axios({
        method: "get",
        url: "https://random-data-api.com/api/users/random_user",
      });

      console.log(res);

      sendResponse({
        response: "success",
      });
    })();
  }

  return true;
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

function a() {
  console.log("e");
}
