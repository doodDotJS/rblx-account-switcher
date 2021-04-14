export function run() {
  const addAccountForm = document.getElementById("add-account-form");
  const cloneOfFormChildren = addAccountForm.children;
  addAccountForm.onsubmit = function () {
    const username = document.getElementById("add-account-username");
    chrome.runtime.sendMessage(
      {
        from: "addAccountMenu",
        whatToDo: "addAccount",
        username: username,
      },
      function (response) {
        alert(response);
      }
    );
  };
}

export default { run };
