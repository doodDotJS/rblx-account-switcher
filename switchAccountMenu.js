export default function () {
  const userButtons = document.querySelectorAll("li.user-button");
  userButtons.forEach((button) => {
    button.onclick = function () {
      chrome.runtime.sendMessage({
        from: "switchAccountMenu",
        whatToDo: "setCookieAndCreateTab",
        username: button.innerText,
      });
    };
  });
}

/*

chrome.cookies.set(
        {
          url: "https://*.roblox.com/*",
          httpOnly: true,
          name: ".ROBLOSECURITY",
          domain: ".roblox.com",
        },
        function (newCookie) {
          chrome.tabs.create({
            url: "https://roblox.com",
          });
          chrome.tabs.onCreated.addListener((tab) => {
            console.error("hello world");
            chrome.runtime.sendMessage({
              greeting: "hi",
              tab,
            });
          });
        }
      );

 */
