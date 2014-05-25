// console.log(init);
if(!init){
	// Init variables
	var show = true;
	var lock = false;
	var img = '<button onclick="loadImage()" type="button" class="btn btn-primary">Load</button>';
	var title = 'Image Search - ';
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
		return oldHtml.replace(/\b(\w+?)\b/g, '<span class="keyword" id="keyword_$1' + '' + '"" style="cursor:pointer; background:grey;">$1</span>')
	})
	.click(function(event) { 
		// console.log($1.text());
		// $(this).popover('show');
		// alert(event.target.innerHTML) 
	});

	// Keyword click events
	var keyword = $('.keyword');
	keyword
	.click(function(event) {

	})
	.popover({title: title+$(this).text(), html: true, content: function () {

		if(show){
			count = 0;
			img = '<button id="loadButton" type="button" class="btn btn-success">Load</button>';
			// onclick="loadImage('+$(this).text()+')"
			but_1 = '';
			but_2 = '';
			but_3 = '';
		}
		show = false;
		lock = true;

		return img + but_1 + but_3 + but_2;
	}})
	// .parent().delegate('button#loadButton', 'click', function() {
	// 	console.log('World!');
	// });

	.on('shown.bs.popover', function () {
		var target_word = $(this).text();
		var loadImage = function(input_txt) {
	        // alert('loadImage!');
	        console.log(input_txt);
	        // img = '<img height="200" src="image/cat.png" />';
			// but_1 = '';
			// if(img_link.length==1)
				// but_2 = '';
			// else
			// but_2 = '<button id="r_search" onclick="r_search_img()" type="button" class="btn btn-primary btn-xs" >〉</button>';
			// but_3 = '<button onclick="tagImage()" type="button" class="btn btn-primary btn-xs" style="margin-right:30px;">Select</button>'
			// $('#keyword_'+input_txt).popover('hide');
			// $('#keyword_'+input_txt).popover('show');
	    };

	    $("#loadButton").click(function(event) {
	    	loadImage(target_word);
	    	$('#keyword_'+target_word).popover('hide');
	    	// $('#keyword_'+target_word).popover('show');
	    	// $(this).parent().popover('hide');
	    });
		// console.log('popover shown!');
	});

}