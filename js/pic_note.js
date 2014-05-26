// console.log(init);
if(!pic_note_init){
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
		return oldHtml.replace(/\b(\w+?)\b/g, '<span class="keyword" id="keyword_$1' + '"" style="cursor:pointer; background:grey;" data-toggle="modal" data-target="#searchBox">$1</span>')
	})
	.click(function(event) { 
		// var keyword = event.target.innerHTML;
		// $('#myModalLabel').text(keyword);

		// // Modal Body
		// $('.modal-body').empty();
		// $('.modal-body').append('<img id="search_img" src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg" width="220" height="165"><br/>');
		// $('.modal-body').append('<br/>');
		// $('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="prev_searchBtn">Previous</button>');
		// $('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="next_searchBtn">Next</button>');

		// // Modal Footer
		// $('.modal-footer').empty();
		// $('.modal-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
		// $('.modal-footer').append('<button type="button" class="btn btn-primary" id="select_imgBtn">Select</button>');
	});

	// Mouse Events
	$(".keyword").mouseenter(function() {
		path_keyword =  $(this).attr('id').split('_');
		path_id = "#path_" + path_keyword[1] + '_' + path_keyword[2];
		if ($(path_id).length > 0){
			var path = d3.select(path_id);
			path.style("stroke-width", 6).style("stroke", "#FF2D2D");
		}
	})
	.mouseleave(function() {
		path_keyword =  $(this).attr('id').split('_');
		if ($(path_id).length > 0){
			var path = d3.select(path_id);
			path.style("stroke-width", 2).style("stroke", "#97CBFF");
		}
	})
	.click(function(event) {
		// var keyword = event.target.innerHTML;
		var keyword = $(this).text();
		var uid = guid();
		$('#myModalLabel').text(keyword + '_' + uid);
		$(this).attr('id', 'keyword_' + keyword + '_' + uid);

		// Modal Body
		$('.modal-body').empty();
		$('.modal-body').append('<img id="search_img" src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg" width="220" height="165"><br/>');
		$('.modal-body').append('<br/>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="prev_searchBtn">Previous</button>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="next_searchBtn">Next</button>');

		// Modal Footer
		$('.modal-footer').empty();
		$('.modal-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
		$('.modal-footer').append('<button type="button" class="btn btn-primary" id="select_imgBtn">Select</button>');
	});

	// Search Events
	$('#searchBox')
	.on('shown.bs.modal', function () {
		var prev_search = function () {
			$('#search_img').attr('src', '');
		}
		$('#prev_searchBtn').click(function(event) {
			prev_search();
		});

		var next_search = function () {
			$('#search_img').attr('src', 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg');
		}
		$('#next_searchBtn').click(function(event) {
			next_search();
		});

		var tag_img = function (keyword_in) {

			// alert(keyword_in);
			var obj_coordinate = $('#keyword_'+keyword_in).offset().left + $('#keyword_'+keyword_in).width()/2;
			if(obj_coordinate<$( window ).width()/2){
				d3.select(".pic_area_left").append("img")
					.attr("src", 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg')
					.attr("width", "200")
					.attr("id", "img_" + keyword_in);
				
				var x = $('#keyword_'+keyword_in).offset().left;
				var y = $('#keyword_'+keyword_in).offset().top + $('#keyword_'+keyword_in).height()/2;
				var h = $('#keyword_'+keyword_in).height();
				// console.log('x: ' + x + ' y: ' + y);

				var img_x = $("#img_"+keyword_in).offset().left + $("#img_"+keyword_in).width();
				var img_y = $("#img_"+keyword_in).offset().top + $("#img_"+keyword_in).height()/2; 

			// 	left = false;
			}else{
				d3.select(".pic_area_right").append("img")
					.attr("src", 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/220px-Grass_dsc08672-nevit.jpg')
					.attr("width", "200")
					.attr("id", "img_" + keyword_in);
				
				var x = $('#keyword_'+keyword_in).offset().left;
				var y = $('#keyword_'+keyword_in).offset().top + $('#keyword_'+keyword_in).height()/2;
				var h = $('#keyword_'+keyword_in).height();
				// console.log('x: ' + x + ' y: ' + y);

				var img_x = $("#img_"+keyword_in).offset().left;
				var img_y = $("#img_"+keyword_in).offset().top + $("#img_"+keyword_in).height()/2;

			// 	left = true;
			}

			var svgcanvas = d3.select("#svgcanvas");
			// (1) Specifying path data the SVG way
			svgcanvas.append("svg:path")
				.attr("d","M " + img_x + " " + img_y + " L " + x + " " + y)
				.attr("id", "path_" + keyword_in)
				.transition().duration(1000)
				.style("stroke-width", 2)
				.style("stroke", "#97CBFF")
				.style("fill", "none");

		}

		$('#select_imgBtn').click(function(event) {
			tag_img($('#myModalLabel').text());
		});

	});

	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	var guid = function() {
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

}