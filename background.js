chrome.runtime.onInstalled.addListener(function() {
        chrome.storage.sync.set({albumArtLink: "./images/get_started128.png"});
});