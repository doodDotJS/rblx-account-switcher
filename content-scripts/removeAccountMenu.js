const removeAcountMenu = document.getElementById("remove-account-menu");

export function run() {
  chrome.storage.sync.get(["accounts"], function (currentData) {
    currentData.accounts.forEach((obj) => {
      const li = document.createElement("li");
      li.innerText = obj.username;
      removeAcountMenu.append(li);
    });

    const buttons = removeAcountMenu.querySelectorAll("li");
    buttons.forEach((button) => {
      button.onclick = function () {
        chrome.runtime.sendMessage(
          {
            from: "removeAccountMenu",
            whatToDo: "removeAccount",
            username: button.innerText,
          },
          {},
          function (response) {
            if (response == "SUCCESS") {
              alert("Success! Click 'Esc'.");
            }
          }
        );
      };
    });
  });
}

export default { run };
