//The chrome.tabs API is only available in background and popup scripts. That's why it is returning tabs as undefined.
//https://developer.chrome.com/docs/extensions/mv3/messaging/#simple
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender, request.command);
  if (request.command === "attach") {
    attachEvent();
    sendResponse({ result: "attached" });
    return true;
  } else {
    detachEvent();
    sendResponse({ result: "detached" });
    return true;
  }
});

function cleanText(rawText) {
  const div = document.createElement("div");
  div.innerHTML = rawText;
  const cleanText = div.textContent || div.innerText || "";
  return cleanText;
}

function handleClickEvent() {
  handleEvent(this);
}

function handleEvent(targetDiv) {
  const rawText = targetDiv.innerHTML;
  const div = document.createElement("div");
  div.innerHTML = rawText;
  const cleanText = div.textContent || div.innerText || "";
  copyTextToClipboard(cleanText);
  alert("copied");
}

const selector = "div[aria-label] div";

function attachEvent() {
  const root = document.querySelector("iframe").contentWindow;
  const targetDivs = root.document.querySelectorAll(selector);

  alert("attachEvent");
  if (targetDivs.length > 0) {
    for (let i = 0; i < targetDivs.length; i++) {
      targetDivs[i].addEventListener("click", handleClickEvent);
    }

    console.info("Bye Bye attachEvent");
  }
}

function detachEvent() {
  const root = document.querySelector("iframe").contentWindow;
  const targetDivs = root.document.querySelectorAll(selector);

  alert("detachEvent");
  if (targetDivs.length > 0) {
    for (let i = 0; i < targetDivs.length; i++) {
      targetDivs[i].removeEventListener("click", handleClickEvent);
    }
    console.info("Bye Bye detachEvent");
  }
}

// Common: Clipboard fuction
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    // https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
      alert(err);
    }
  );
}
