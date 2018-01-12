var chrome = chrome ? chrome : navigator,
    tab = tab ? tab : {ib: 0};

// Add listener to handle click
chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    chrome.tabs.executeScript(tab.ib, {
        file: 'inject.js'
    });
});

// Add listener to display number of components on that page
chrome.runtime.onMessage.addListener(setBadgeCounter);

// Execute content script to check the number of components on that page
chrome.tabs.executeScript(tab.ib, {
    file: 'display.js'
});

// When tab changed send request to update badge counter
chrome.tabs.onActiveChanged.addListener(function(tabid) {
    chrome.tabs.sendMessage(tabid, { data: tabid }, setBadgeCounter);
});

/***********\
< * UTILS * >
\***********/

function setBadgeCounter(request) {
    chrome.browserAction.setBadgeText({ text: `${request.data}` });
}