var url=window.location.toString();

if($('#vivid_note_reformat').length == 0){
	// Extract the pure content of the webpage
	// $.getJSON("https://www.readability.com/api/content/v1/parser?url="+ url +"&token=5a2ddd762b80b65f061bd17c984e61f32b50bdf4",
	$.getJSON("http://boilerpipe-web.appspot.com/extract?url=" + url + "&output=json",
		function (data) {
			console.log(data);

			var content = data.response.content;

			$('body').append('<div id="vivid_note_reformat"></div>');
			// Test <p>
			// $('#vivid_note_reformat').append('<p>123</p>');
			$('#vivid_note_reformat').append('<div id="vivid_note_content"></div>');
			$('#vivid_note_content').append('<p>'+content+'</p>');
			$('#vivid_note_reformat').append('<div id="vivid_note_tool"></div>');
			$('#vivid_note_tool').append('<button id="vivid_BK" type="button" class="btn btn-primary">Back</button>');
			$('#vivid_note_tool').append('<button id="vivid_MT" type="button" class="btn btn-primary">Translation</button>');
			$('#vivid_note_tool').append('<button id="vivid_PN" type="button" class="btn btn-primary">Picture Note</button>');
			$('#vivid_note_tool').append('<button id="vivid_SV" type="button" class="btn btn-primary">Save</button>');
		}
	);

	$('body').children().hide();
	$('#vivid_note_reformat').show("slow");
}else if($('#vivid_note_reformat').is(':visible')){
	$('body').children().show();
	$('#vivid_note_reformat').hide("slow");
}else{
	$('body').children().hide();
	$('#vivid_note_reformat').show("slow");
}