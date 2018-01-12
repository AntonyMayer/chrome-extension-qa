var chrome = chrome ? chrome : navigator, 
    port = port ? port : chrome.runtime.connect();

// on page load send data to extension
chrome.runtime.sendMessage(countComponents());

// when tab switched => send data for that page/tab to extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse(countComponents());
});

/***********\
< * UTILS * >
\***********/

function countComponents() {
    return { data: [...document.querySelectorAll('[data-component]')].length };
}