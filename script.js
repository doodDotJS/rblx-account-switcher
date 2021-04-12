const switchAccountButton = document.getElementById("switch-account-button");
const mainOptions = document.getElementById("main-options");
const switchAccountOptions = document.getElementById("switch-account-options");

switchAccountButton.onclick = function () {
  getAccounts(function (accounts) {
    mainOptions.style.display = "none";
    switchAccountOptions.style.display = "flex";
    if (accounts.length == 0) switchAccountOptions.innerText = "No accounts!";
  });
};

function getAccounts(callback) {
  chrome.storage.sync.get(["accounts"], function (result) {
    if (result.accounts.length == 0) callback([]);
    callback(result.accounts);
  });
}
