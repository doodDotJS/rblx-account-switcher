export function run() {
  const addAccountForm = document.getElementById("add-account-form");
  const cloneOfFormChildren = addAccountForm.children;
  addAccountForm.onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("add-account-username");
    addAccountForm.innerText =
      "Please login to the account if you haven't already. Once you're done, click the button.";

    const loggedInButton = document.createElement("button");
    loggedInButton.classList.add("logged-in-submit-button");
    loggedInButton.style.marginTop = ".5rem";
    loggedInButton.innerText = "Logged in";
    addAccountForm.append(loggedInButton);
  };
}

export default { run };
