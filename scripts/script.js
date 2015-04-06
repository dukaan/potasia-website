var flag = true;
var flag2 = true
var lastScrollPos = 0;


// start view arrow button click
$(document).ready(function() {
	$('#down-arrow-button').click(function() {
		$("html, body").animate({ scrollTop: $(window).height() }, 800, function() {
			$( "#navigation" ).fadeTo( 200 , 1, function() {
    			// Animation complete.
  			});
		});
		flag = false;
		flag2 = true;
	});
});

// full page scroll
$(document).on( 'scroll', function() {

	var curScrollPos = $(this).scrollTop();
	if(lastScrollPos < curScrollPos) {
		//scroll down
		if(flag) {
			$("html, body").animate({ scrollTop: $(window).height() }, 800, function() {
				$( "#navigation" ).fadeTo( 200 , 1, function() {
	    			// Animation complete.
	  			});
			});
			flag = false;
			flag2 = true;
		}
	} else {
		//scroll up
		console.log("body scrolltop: " + $("body").scrollTop());
		console.log("content offset y" + $("#content-wrapper").offset().top);

		if($("body").scrollTop() < $("#content-wrapper").offset().top && flag2) {
			$( "#navigation" ).fadeTo( 200 , 0, function() {
	    		// Animation complete.
	  		});
			$("html, body").animate({ scrollTop: 0 }, 800, function() {
				// completion handler
			});
			flag2 = false;
		}

		if( $('body').scrollTop() === 0) {
			flag = true;
		}
	}

	lastScrollPos = curScrollPos;

});