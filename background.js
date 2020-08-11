chrome.runtime.onInstalled.addListener(function() {
        chrome.storage.sync.set({albumArtLink: "./images/placeholder.png"});
});