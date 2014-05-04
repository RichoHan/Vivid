chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.0.min.js"},function () {
		chrome.tabs.executeScript({file: "js/bootstrap.min.js"},function () {
			chrome.tabs.insertCSS({file: "stylesheets/styles.css"});
			chrome.tabs.insertCSS({file: "css/bootstrap.min.css"});
			chrome.tabs.executeScript({file: "js/vivid.js"}, function () {
				// chrome.tabs.executeScript('var s = document.createElement("script"); s.src = chrome.extension.getURL("js/pic_note.js"); $("body").append(s);');
			});
		});
	});
});

// var jQueryElement=document.createElement('script');
// jQueryElement.type = 'text/javascript';
// jQueryElement.src = 'js/pic_note.js';
// document.getElementsByTagName('head')[0].appendChild(jQueryElement);