var init = false;
var vivid_init = false;
var pic_note_init = false;
var state = 0;

localStorage["state"] = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.0.min.js"},function () {
		chrome.tabs.executeScript({file: "js/bootstrap.min.js"},function () {
			chrome.tabs.executeScript({file: "js/icheck.min.js"},function () {
				chrome.tabs.executeScript({file: "js/d3.min.js"},function () {
					chrome.tabs.executeScript({file: "js/PorterStemmer2.min.js"},function () {
				// <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

						// then the state # will increase
						// thus, when extension is executed after the second time,
						// the pic_note.js will not be inserted again
						state = parseInt(localStorage["state"]);
						localStorage["state"] = state + 1;
						console.log(localStorage["state"]);
						if(localStorage["state"]>=2)
							vivid_init = true;
						if(localStorage["state"]>=3)
							pic_note_init = true;

						chrome.tabs.insertCSS({file: "stylesheets/styles.css"});
						chrome.tabs.insertCSS({file: "css/bootstrap.min.css"});
						chrome.tabs.insertCSS({file: "css/bootflat.min.css"});
						// chrome.tabs.executeScript({file: "js/vivid.js"});
						chrome.tabs.executeScript({code: "var pic_note_init = " + pic_note_init + ";" + "var vivid_init = " + vivid_init + ";" + "var state = " + state + ";"},function () {
							// insert js at the first time
							if(!vivid_init)
								chrome.tabs.executeScript({file: "js/vivid.js"});
							if(!pic_note_init)
								chrome.tabs.executeScript({file: "js/pic_note.js"});
							
						});
					});
				});
			});
		});
	});
});