export default function () {
  const userButtons = document.querySelectorAll("li.user-button");
  userButtons.forEach((button) => {
    button.onclick = function () {
      alert(button.innerText);
    };
  });
}
