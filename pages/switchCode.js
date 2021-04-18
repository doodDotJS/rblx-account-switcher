const switches = document.querySelectorAll(".switch");

switches.forEach((switcH) => {
  const beforeElement = switcH.querySelector(".switch-thumb");
  switcH.onclick = function () {
    if (switcH.dataset.active == "false") {
      beforeElement.style.transform = "translateX(100%)";

      switcH.dataset.active = "true";
    } else {
      beforeElement.style.transform = "";
      switcH.dataset.active = "false";
    }
  };
});
