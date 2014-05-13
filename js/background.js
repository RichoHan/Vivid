chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.0.min.js"},function () {
		chrome.tabs.executeScript({file: "js/bootstrap.min.js"},function () {
			chrome.tabs.insertCSS({file: "stylesheets/styles.css"});
			chrome.tabs.insertCSS({file: "css/bootstrap.min.css"});
			chrome.tabs.executeScript({file: "js/vivid.js"});
			// chrome.tabs.executeScript({file: "js/pic_note.js"});
		});
		// chrome.tabs.executeScript({
		// 	code: 	'var bkg = chrome.extension.getBackgroundPage();' +
		// 			'bkg.console.log($("#vivid_note_reformat").length);'
		// });
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			console.log(tabs);
		});
		// var bkg = chrome.extension.getBackgroundPage();
		// bkg.console.log($('#vivid_note_reformat'));
		// bkg.console.log($('#vivid_note_reformat').length);
		// if($('#vivid_note_reformat').length == 0){
		// 	chrome.tabs.executeScript({file: "js/pic_note.js"});
		// }
		// console.log($('#vivid_note_reformat').length);
	});
});