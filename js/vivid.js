var url=window.location.toString();
// console.log(url);

if($('#vivid_note_reformat').length == 0){
	$.getJSON("https://www.readability.com/api/content/v1/parser?url="+ url +"&token=5a2ddd762b80b65f061bd17c984e61f32b50bdf4",
		function (data) {
			var content = data.content;
			$('body').append('<div id="vivid_note_reformat"></div>');
			$('#vivid_note_reformat').append('<div id="vivid_note_content"></div>');
			$('#vivid_note_content').append(content);
			$('#vivid_note_reformat').append('<div id="vivid_note_tool"></div>');
			$('#vivid_note_tool').append('<button id="vivid_BK" type="button" class="btn btn-primary">Back</button>');
			$('#vivid_note_tool').append('<button id="vivid_MT" type="button" class="btn btn-primary">Translation</button>');
			$('#vivid_note_tool').append('<button id="vivid_PN" type="button" class="btn btn-primary">Picture Note</button>');
			$('#vivid_note_tool').append('<button id="vivid_SV" type="button" class="btn btn-primary">Save</button>');
			// $('#vivid_note_reformat').append('<script> $("button").click(function() { if($(this).attr("id")=="vivid_BK"){alert("test")} }); </script>');
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