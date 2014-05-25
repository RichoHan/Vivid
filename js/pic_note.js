// console.log(init);
if(!init){

	$("#vivid_BK").click(function() { 
		alert("test");
	});

	$("#vivid_PN").click(function() {
		console.log("Picture Note-taking!");
	});

	var p = $('p');

	p
	.html(function(index, oldHtml) {
		return oldHtml.replace(/\b(\w+?)\b/g, '<span class="word">$1</span>')
	})
	.click(function(event) { alert(event.target.innerHTML) });

}