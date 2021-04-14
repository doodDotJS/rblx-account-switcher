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
      {},
      function (response) {
        if (response == undefined)
          return alert(
            "An error occurred when getting the response from the background."
          );
        alert(response.response);
      }
    );
  };
}

export default { run };
