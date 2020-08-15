// Observer target Album art
const albumArt = document.querySelectorAll(".image.ytmusic-player-bar");
// To prevent double update of the Album art link
var oldLink = "";
// Obsever config
const config = { attributes: true, childList: true};

function uri2array(uri, buffer) {
        var marker = ';base64,';
        var raw = window.atob(uri.substring(uri.indexOf(marker) + marker.length));
        var n = raw.length;
        var a = new Uint8Array(new ArrayBuffer(n));

        for (var i = 0; i < n; i++) {
            a[i] = raw.charCodeAt(i);
        }
        
        return buffer ? a.buffer : a;
}

function imageReceived() {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
      
        canvas.width = downloadedImg.width;
        canvas.height = downloadedImg.height;
       
        context.drawImage(downloadedImg, 0, 0);
       
        try {
                var imgData = uri2array(canvas.toDataURL("image/png"));
                console.log(imgData);
        } catch (err) {
                console.log("Error: " + err);
        }  
}

function startDownload(imageURL) {
        downloadedImg = new Image;
        downloadedImg.crossOrigin = "Anonymous";
        downloadedImg.addEventListener("load", imageReceived, false);
        downloadedImg.src = imageURL;
}

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
                        startDownload(linkResized);
                }
        });
}
// Create observer object
const observer = new MutationObserver(observerCallback);
// Start observer 
observer.observe(albumArt[0], config);