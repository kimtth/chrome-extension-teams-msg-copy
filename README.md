# Teams Message Copy Helper: Pop!Pop!

- This demo is the toy extension designed to facilitate Teams message copying by clicking on a message.

## Objectives

- The objective is to check the feasibility of Teams message copying using the Chrome extension development kit.

1. The extension only works on the Teams website, `https://teams.microsoft.com/`.

2. It implements a virtual rendering mechanism in Teams, which adds a copy feature when clicking the `Activate Message Copy` in the context menu.

## Descriptions

`background.js` is a service worker that displays a custom context menu for the extension.

`content-script.js` is a file responsible for attaching and detaching actual events, and it will be injected into each message.

The service worker and web page work on separate threads. To trigger the action in `content-script.js`, the code implements an event sending mechanism from `background.js` to `content-script.js`, which can trigger the actions through commands.

## How to Install the Extension Development Version

1. Access the extension pages by typing `edge://extensions/` in Edge or `chrome://extensions/` in Chrome into the address bar.

2. Load the code directory could import files by following the menu.

    <img src="doc/ext_install.png" width="200">

## Demo
