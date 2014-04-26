chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.0.min.js"},function () {
		chrome.tabs.insertCSS({file: "stylesheets/styles.css"});
		chrome.tabs.executeScript({file: "js/vivid.js"});
	});
});