chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.1.min.js"},function () {
		$.ajax({
			type: "GET",
			url: "http://127.0.0.1:8000/getUrl",
			// data: "",
			// dataType: "text",
			success: function(data, textStatus) {
				// alert(data.url);
				window.open(data.url);
			},
			error: function(err){
				console.log(err);
			}
		});	});
});