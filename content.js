// Observer target Album art
const albumArt = document.querySelectorAll(".image.ytmusic-player-bar");
// To prevent double update of the Album art link
var oldLink = "";
// Obsever config
const config = { attributes: true, childList: true};

function observerCallback(mutations) {
        mutations.forEach(function() {
                // Get unprocessed Album art link from target attribute
                var linkRaw = albumArt[0].getAttribute("src");
                if (linkRaw != oldLink) {
                        oldLink = linkRaw;
                } else {
                        // Change Album art resolution from 60x60px to 240x240px 
                        var linkResized = linkRaw.replace("=w60-h60-", "=w240-h240-");
                        // Store Album art link
                        chrome.storage.sync.set({albumArtLink: linkResized});
                }
        });
}
// Create observer object
const observer = new MutationObserver(observerCallback);
// Start observer 
observer.observe(albumArt[0], config);