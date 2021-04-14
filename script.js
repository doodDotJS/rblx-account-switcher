const mainOptions = document.getElementById("main-options");
const switchAccountButton = document.getElementById("switch-account-button");
const switchAccountOptions = document.getElementById("switch-account-options");
const addAccountButton = document.getElementById("add-account-button");
const addAccountForm = document.getElementById("add-account-form");

import switchAccountMenuCode from "./switchAccountMenu.js";

switchAccountButton.onclick = function () {
  getAccounts(function (accounts) {
    mainOptions.style.display = "none";
    switchAccountOptions.style.display = "flex";
    if (accounts.length == 0)
      return (switchAccountOptions.innerText = "No accounts!");

    accounts.forEach((obj) => {
      const li = document.createElement("li");
      li.innerText = obj.username;
      li.classList.add("user-button");
      switchAccountOptions.append(li);
    });
    switchAccountMenuCode();
  });
};

addAccountButton.onclick = function () {
  mainOptions.style.display = "none";
  addAccountForm.style.display = "flex";
};

function getAccounts(callback) {
  chrome.storage.sync.get(["accounts"], function (result) {
    if (result.accounts.length == 0) callback([]);
    callback(result.accounts);
  });
}
