if(!pic_note_init){

	var show = true;
	var lock = false;
	var img = '<button onclick="loadImage()" type="button" class="btn btn-primary">Load</button>';
	var popover_title = 'Image Search - ';
	var but_1 = '';
	var but_2 = '';
	var but_3 = '';

	var img_urls_count = 0;
	var tmp_img_urls = new Array();
	tmp_img_urls = [];

	var keyword_left;
	var keyword_top;

	// For MT
	var stringToBeTranslated = "";

	// Button events
	$("#vivid_BK").click(function() { 
		$("#vivid_PN").attr('class', 'btn btn-primary');
		$('#vivid_MT').attr('class', 'btn btn-primary');
	});

	$("#vivid_PN").click(function() {
		// $("#vivid_PN").attr('class', 'btn btn-primary disabled');
		// $('#vivid_MT').attr('class', 'btn btn-primary');
	});

	document.onmouseup = gText;
	if (!document.all) document.captureEvents(Event.MOUSEUP);

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

		var keyword = stemmer($(this).text(), true);
		// console.log(stemmer(keyword, true));
		var uid = guid();

		$('#myModalLabel').text(keyword + '_' + uid);
		$(this).attr('id', 'keyword_' + keyword + '_' + uid);

		keyword_left = $(this).offset().left;
		keyword_top = $(this).offset().top;

		// ImageNet
		// http://www.image-net.org/api/text/imagenet.synset.geturls?wnid=[wnid]

		$.ajax({
			url: 'http://image-net.org/search?q='+keyword,
			type: 'GET',
			// async: false,
			// beforeSend: function() {
			// 	$('body').append('<h1 style="position: absolute; top: 50px; z-index: 999;">Loading</h1>');
			// },
			// complete: function() {
			// 	// ... your finalization code here (hide loader) ...
			// },
			success: function(data) {
				var res = $(data).find('span.result_synset').parent("a").attr("href");
				if(typeof res != 'undefined'){
					var wnid = res.split('=')[1];
					$.ajax({
						url: 'http://www.image-net.org/api/text/imagenet.synset.geturls?wnid='+wnid,
						type: 'GET',
						// async: false,

						success: function(img_urls) {
							var res = img_urls.split('\n')
							img_urls_count = 0;
							tmp_img_urls = [];
							tmp_img_urls = tmp_img_urls.concat(res);
							console.log(tmp_img_urls[img_urls_count]);

							$('.search_result').empty();
							$('.search_result').append('<img id="search_img" src="' + tmp_img_urls[img_urls_count] + '" width="220" height="165"><br/>');
							console.log('Succeed!');
						},
						error: function(err){
							console.log(err);
						}
					});
				}else{
					$('.search_result').empty();
					$('.search_result').append('<p>Not found.</p>');
				}
			},
			error: function(err){
				console.log(err);
			}
		});

		// $('.modal-body').empty();
		// $('.modal-body').append('<p>Loading</p>');
		// $('.modal-footer').empty();
		// console.log('Loading');

		// Modal Body
		$('.modal-body').empty();
		// $('.modal-body').append('<img id="search_img" src="' + tmp_img_urls[img_urls_count] + '" width="220" height="165"><br/>');
		$('.modal-body').append('<div class="search_result"></div>');
		$('.search_result').append('<p>Loading</p>');
		$('.modal-body').append('<br/>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="prev_searchBtn">Previous</button>');
		$('.modal-body').append('<button type="button" class="searchBtn btn btn-success" id="next_searchBtn">Next</button>');

		// Modal Footer
		$('.modal-footer').empty();
		$('.modal-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
		$('.modal-footer').append('<button type="button" class="btn btn-primary" data-dismiss="modal" id="select_imgBtn">Select</button>');

	});

	// Search Events
	$('#searchBox')
	.on('shown.bs.modal', function () {
		var prev_search = function () {
			$('#search_img').attr('src', tmp_img_urls[--img_urls_count]);
		}
		$('#prev_searchBtn').click(function(event) {
			if(img_urls_count>0)
				prev_search();
		});

		var next_search = function () {
			if(img_urls_count<tmp_img_urls.length-1)
				$('#search_img').attr('src', tmp_img_urls[++img_urls_count]);
		}
		$('#next_searchBtn').click(function(event) {
			next_search();
		});

		var tag_img = function (keyword_in) {

			// alert(keyword_in);
			var obj_coordinate = $('#keyword_'+keyword_in).offset().left + $('#keyword_'+keyword_in).width()/2;
			if(obj_coordinate<$( window ).width()/2){
				d3.select(".pic_area_left").append("img")
					.attr("src", tmp_img_urls[img_urls_count])
					.attr("width", "200")
					.attr("id", "img_" + keyword_in);
				
				var x = keyword_left; // $('#keyword_'+keyword_in).offset().left;
				var y = keyword_top + $('#keyword_'+keyword_in).height()/2; // $('#keyword_'+keyword_in).offset().top + $('#keyword_'+keyword_in).height()/2;
				var h = $('#keyword_'+keyword_in).height();
				// console.log('x: ' + x + ' y: ' + y);

				var img_x = $("#img_"+keyword_in).offset().left + $("#img_"+keyword_in).width();
				var img_y = $("#img_"+keyword_in).offset().top + $("#img_"+keyword_in).height()/2; 

			// 	left = false;
			}else{
				d3.select(".pic_area_right").append("img")
					.attr("src", tmp_img_urls[img_urls_count])
					.attr("width", "200")
					.attr("id", "img_" + keyword_in);
				
				var x = keyword_left + $('#keyword_'+keyword_in).width(); // $('#keyword_'+keyword_in).offset().left;
				var y = keyword_top + $('#keyword_'+keyword_in).height()/2; // $('#keyword_'+keyword_in).offset().top + $('#keyword_'+keyword_in).height()/2;
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

			$('#keyword_'+keyword_in).css('background','#98F5FF');

		};

		$('#select_imgBtn').click(function(event) {
			tag_img($('#myModalLabel').text());
			$('#searchBox').modal('hide');
		});

	});

	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	var guid = function() {
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	var t = '';
	function gText(e) {
		t = (document.all) ? document.selection.createRange().text : document.getSelection();
		stringToBeTranslated = t;
		// document.getElementById('input').value = t;
	}

	$("#vivid_MT").click(function() {
		// $("#vivid_PN").attr('class', 'btn btn-primary');
		// $('#vivid_MT').attr('class', 'btn btn-primary disabled');
		if(stringToBeTranslated!=""){
		
			// Modal Body
			$('.modal-body').empty();
			$('.modal-body').append('<div class="translation_result"></div>');
			$('.translation_result').append('<p>' + stringToBeTranslated + '</p>');

			// Modal Footer
			$('.modal-footer').empty();
			$('.modal-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
			$('.modal-footer').append('<button type="button" class="btn btn-primary" data-dismiss="modal" id="appendMTBtn">Append</button>');
		}
		stringToBeTranslated = "";
	});

	// Machine Translation Events
	$('#MTBox')
	.on('shown.bs.modal', function () {

		var appendMT = function () {
			console.log(stringToBeTranslated);

		};

		$('#appendMTBtn').click(function(event) {
			appendMT();
			$('#MTBox').modal('hide');
		});

	});

}