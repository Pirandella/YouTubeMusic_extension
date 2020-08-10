let albumArtImg = document.createElement("img");

chrome.storage.sync.get("albumArtLink", function(link) {
        albumArtImg.src = link.albumArtLink;
});

function showAlbumArt(albumArtImg) {
        document.getElementById("albumArt").appendChild(albumArtImg);
};

chrome.browserAction.onClicked.addListener(showAlbumArt(albumArtImg))