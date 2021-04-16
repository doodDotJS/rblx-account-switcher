const mainOptions = document.getElementById("main-options");

const switchAccountButton = document.getElementById("switch-account-button");
const switchAccountOptions = document.getElementById("switch-account-options");

const addAccountButton = document.getElementById("add-account-button");
const addAccountForm = document.getElementById("add-account-form");

const removeAccountButton = document.getElementById("remove-account-button");
const removeAccountMenu = document.getElementById("remove-account-menu");

const settingsButton = document.getElementById("settings-button");

import switchAccountMenuCode from "./switchAccountMenu.js";
import addAccountMenuCode from "./addAccountMenu.js";
import removeAccountMenuCode from "./removeAccountMenu.js";

settingsButton.onclick = function () {
  chrome.tabs.create({
    url: "/pages/settings.html",
    active: true,
  });
};

switchAccountButton.onclick = function () {
  getAccounts(function (accounts) {
    console.log(accounts);
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
    switchAccountMenuCode.run();
  });
};

addAccountButton.onclick = function () {
  mainOptions.style.display = "none";
  addAccountForm.style.display = "flex";
  addAccountMenuCode.run();
};

removeAccountButton.onclick = function () {
  mainOptions.style.display = "none";
  removeAccountMenu.style.display = "block";
  removeAccountMenuCode.run();
};

function getAccounts(callback) {
  chrome.storage.sync.get(["accounts"], function (result) {
    if (result.accounts.length == 0) callback([]);
    callback(result.accounts);
  });
}
