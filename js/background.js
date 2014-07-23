chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "js/jquery-2.1.1.min.js"},function () {
		$.ajax({
			type: "GET",
			url: "http://140.114.200.63/tagging/result",
			// data: "",
			// dataType: "text",
			success: function(data, textStatus) {
				window.location.href = "google.com";
				if (data.redirect) {
					window.location.href = data.redirect;
				} else {
					console.log(data);
				}
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		});	});
});