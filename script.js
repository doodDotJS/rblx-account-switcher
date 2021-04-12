const switchAccountButton = document.getElementById("switch-account-button");
const mainOptions = document.getElementById("main-options");
const switchAccountOptions = document.getElementById("switch-account-options");

switchAccountButton.onclick = function () {
  mainOptions.style.display = "none";
  switchAccountOptions.style.display = "flex";
};
