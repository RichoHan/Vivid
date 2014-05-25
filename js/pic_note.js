// console.log(init);
if(!init){
	// Init variables
	var show = true;
	var lock = false;
	var img = '<button onclick="loadImage()" type="button" class="btn btn-primary">Load</button>';
	var popover_title = 'Image Search - ';
	var but_1 = '';
	var but_2 = '';
	var but_3 = '';

	// Button events
	$("#vivid_BK").click(function() { 
		alert("test");
	});

	$("#vivid_PN").click(function() {
		console.log("Picture Note-taking!");
	});

	// Assign each word an event
	var p = $('.vivid_note_content_p');
	p
	.html(function(index, oldHtml) {
		return oldHtml.replace(/\b(\w+?)\b/g, '<span class="keyword" id="keyword_$1' + '' + '"" style="cursor:pointer; background:grey;" data-toggle="modal" data-target="#searchBox">$1</span>')
	})
	.click(function(event) { 
		var keyword = event.target.innerHTML;
		$('#myModalLabel').text('Image Search : ' + keyword);
		$('.modal-body').empty();
		$('.modal-body').append('<img id="search_img" src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg" width="220" height="165"><br/>');
		$('.modal-body').append('<br/>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="prev_searchBtn">Previous</button>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="next_searchBtn">Next</button>');
		// var enc = $('<div/>').text('<script type="text/javascript">  function test() {    a = 5;   }<\/script>').html();
	});

	$('.keyword')
	.click(function(event) {
		// alert('Hello');
	});

	// Search Events
	$('#searchBox')
	.on('shown.bs.modal', function () {
		var prev_search = function () {
			// alert('Hello');
			$('#search_img').attr('src', '');
		}
		$('#prev_searchBtn').click(function(event) {
			prev_search();
		});

		var next_search = function () {
			// alert('Hello');
			$('#search_img').attr('src', 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg');
		}
		$('#next_searchBtn').click(function(event) {
		// 	alert('Hello');
			next_search();
		});
	});

}