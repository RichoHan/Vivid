chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.1.min.js"},function () {
    	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    		console.log(tabs[0].url);
			var current_url = tabs[0].url;
			$.get('http://127.0.0.1:8000/getUrl', { current_url: current_url }, function(data) {
    			window.open(data.url);
			});
		});
	});
});