var chrome = chrome ? chrome : navigator,
    tab = tab ? tab : {};

/**
 * Add listener to handle click
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    chrome.tabs.executeScript(tab.ib, {
        file: 'inject.js'
    });
});

/**
 * Add listener to display number of components on that page
 */
chrome.runtime.onMessage.addListener(function (request) {
    chrome.browserAction.setBadgeText({ text: `${request.data}`});
});

chrome.tabs.executeScript(tab.ib, {
    file: 'display.js'
});