var url=window.location.toString();

if(!vivid_init){
	// console.log('State:'+state);
	console.log('Fetching...');
	// Extract the pure content of the webpage
	// $.getJSON("https://www.readability.com/api/content/v1/parser?url="+ url +"&token=5a2ddd762b80b65f061bd17c984e61f32b50bdf4",
	$.getJSON("http://boilerpipe-web.appspot.com/extract?url=" + url + "&output=json",
	// $.getJSON("http://juicer.herokuapp.com/api/article?url=" + url + "",
		function (data) {
			var content = data.response.content;
			// var content = data.article.body;

			$('body').append('<div id="vivid_note_reformat"></div>');
			$('body').append('<div class="pic_area"></div>');
			$('body').append('<div class="pic_area_left"></div>');
			$('body').append('<div class="pic_area_right"></div>');
			var divElem = d3.select(".pic_area");
			var svgcanvas = divElem.append("svg:svg")
				.attr("width", $( window ).width())
				.attr("height", 2500)
				.attr("id", "svgcanvas");

			$('#vivid_note_reformat').append('<div id="vivid_note_content"></div>');
			$('#vivid_note_content').append('<p class="vivid_note_content_p">'+content+'</p>');
			$('#vivid_note_reformat').append('<div id="vivid_note_tool"></div>');
			$('#vivid_note_tool').append('<button id="vivid_BK" type="button" class="btn btn-primary">Back</button>');
			$('#vivid_note_tool').append('<button id="vivid_MT" type="button" class="btn btn-primary">Translation</button>');
			$('#vivid_note_tool').append('<button id="vivid_PN" type="button" class="btn btn-primary">Picture Note</button>');
			$('#vivid_note_tool').append('<button id="vivid_SV" type="button" class="btn btn-primary">Save</button>');

			$('body').append('<div class="modal fade" id="searchBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>');

			// Assign each word an event
			var p = $('.vivid_note_content_p');
			p
			.html(function(index, oldHtml) {
				return oldHtml.replace(/\b(\w+?)\b/g, '<span class="keyword" id="keyword_$1' + '"" style="cursor:pointer;" data-toggle="modal" data-target="#searchBox">$1</span>')
			})

		}
	);

	$('body').children().hide();
	
	console.log('Showing');
	$('#vivid_note_reformat').show();
	$('.pic_area').show();
	$('.pic_area_left').show();
	$('.pic_area_right').show();

}else if($('#vivid_note_reformat').is(':visible')){
	$('body').children().show();

	console.log('Hiding');
	$('.pic_area').hide();
	$('#vivid_note_reformat').hide();
	$('.pic_area_left').hide();
	$('.pic_area_right').hide();

}else{
	$('body').children().hide();

	console.log('Showing');
	$('.pic_area').show();
	$('#vivid_note_reformat').show();
	$('.pic_area_left').show();
	$('.pic_area_right').show();

}