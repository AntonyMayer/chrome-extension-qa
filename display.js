var chrome = chrome ? chrome : navigator, 
    port = port ? port : chrome.runtime.connect();

chrome.runtime.sendMessage({ data: [...document.querySelectorAll('[data-component]')].length });