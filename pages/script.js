const saveChangesButton = document.getElementById("save-changes-button");
const showNotificationSwitch = document.getElementById(
  "show-notification-switch"
);

chrome.storage.sync.get(["settings"], function (data) {
  showNotificationSwitch.dataset.active = String(
    data.settings.showNotifications
  );
  if (data.settings.showNotifications == true)
    showNotificationSwitch.children[0].style.transform = "translateX(100%)";
});

saveChangesButton.onclick = function () {
  chrome.runtime.sendMessage(
    {
      from: "settings",
      whatToDo: "updateSettings",
      showNotifications: showNotificationSwitch.dataset.active,
    },
    {},
    function (response) {
      if (response == "SUCCESS") alert("Successfully applied changes.");
    }
  );
};

const getDataButton = document.getElementById("get-data-button");

getDataButton.onclick = function () {
  chrome.storage.sync.get(["accounts", "settings"], function (data) {
    const blobby = new Blob([JSON.stringify(data)], {
      type: "application/javascript;charset=utf-8",
    });

    window.location.replace(window.URL.createObjectURL(blobby));
  });
};
