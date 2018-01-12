# Chrome extension for QA

## Description
Highlights all `components` on current page.
Displays component's **ID** and **Scope**.

## Hotkey
```
Ctrl + Shift + F
```

## Installation

1. Clone repo
2. Install extension https://developer.chrome.com/extensions/getstarted#unpacked

## HTML example

Following section will be highlighted when extension is used,
displaying **ID: 503** and **Scope: global**.


```html
<section data-component="503" data-scope="global">
    ...
</section>
```

***Note:*** *If scope is not defined **local** will be displayed as default.*