var init = false;
var state = 0;
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.0.min.js"},function () {
		chrome.tabs.executeScript({file: "js/bootstrap.min.js"},function () {
			chrome.tabs.executeScript({file: "js/icheck.min.js"},function () {
				chrome.tabs.insertCSS({file: "stylesheets/styles.css"});
				chrome.tabs.insertCSS({file: "css/bootstrap.min.css"});
				chrome.tabs.insertCSS({file: "css/bootflat.min.css"});
				chrome.tabs.executeScript({file: "js/vivid.js"});
				chrome.tabs.executeScript({code: "var init = " + init + ";"},function () {
					// insert js at the first time
					chrome.tabs.executeScript({file: "js/pic_note.js"});
					// then the state # will increase
					// thus, when extension is executed after the second time,
					// the pic_note.js will not be inserted again
					state++;
					if(state>=2)
						init = true;
				});
			});
		});
	});
});