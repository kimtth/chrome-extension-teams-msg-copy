// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

async function genericOnClick(info) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab.url.includes("teams.microsoft.com")) {
    console.warn("Please check your url, teams.microsoft.com");
    return;
  } else {
    if (info.menuItemId == "attach") {
      const responseAttach = await chrome.tabs.sendMessage(tab.id, {
        command: "attach",
      });
      console.log("Status:", responseAttach);
    } else if (info.menuItemId == "detach") {
      const responseDettach = await chrome.tabs.sendMessage(tab.id, {
        command: "detach",
      });
      console.log("Status:", responseDettach);
    }
  }
}

// https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/contextMenus/basic
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Activate Message Copy",
    id: "attach",
  });

  chrome.contextMenus.create({
    title: "Deactivate Message Copy",
    id: "detach",
  });
});
