var flag = true;
var flag2 = true
var lastScrollPos = 0;

$(document).ready(function() {

	// start view arrow button click
	$('#down-arrow-button').click(function() {
		$("html, body").animate({ scrollTop: $(window).height() - $("#navigation").height() }, 800);
		setTimeout(function() {
			$( "#navigation" ).fadeTo( 200 , 1, function() {
    			// Animation complete.
  			});	
		}, 600);
		flag = false;
		flag2 = true;
	});

	/* 
	 ** jssor slider begin
	 ** options for jssor slider
	 ** fullscreen slider with nearby snapshots
	*/

    var options = {
    	$FillMode: 2, 
        $AutoPlay: true,
        $AutoPlayInterval: 5000,
        $PauseOnHover: 1, 

        $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slideshow is auto playing, default value is false

        $ArrowKeyNavigation: true,   			        //Allows arrow key to navigate or not
        $SlideWidth: 1750,                              //[Optional] Width of every slide in pixels, the default is width of 'slides' container
        //$SlideHeight: 300,                            //[Optional] Height of every slide in pixels, the default is width of 'slides' container
        $SlideSpacing: 75, 					            //Space between each slide in pixels
        $DisplayPieces: 2,                              //Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
        $ParkingPosition: 600,                          //The offset position to park slide (this options applys only when slideshow disabled).

        $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
            $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
            		$ChanceToShow: 2,                   //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 2,                     //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1                           //[Optional] Steps to go for each navigation request, default value is 1
        }
    };

    var jssor_slider1 = new $JssorSlider$("slideshow-container", options);

    //responsive code begin
    // scale slideshow with windowsize
    function ScaleSlider() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth)
            jssor_slider1.$ScaleWidth(Math.min(parentWidth, 3000)); 	//max width is set to slideshow-container size (set in css, here: 3000)
        else
            window.setTimeout(ScaleSlider, 30);
    }
    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end

    /*
     ** calculate navbar arrow size
     ** each navbar item has a specific size
    */
    $(".arrow-down").css({
    	"border-left": $(".active").width()/2 + "px solid transparent",
		"border-right": $(".active").width()/2 + "px solid transparent"
    });

});

// full page scroll
$(document).on( 'scroll', function() {

	var curScrollPos = $(this).scrollTop();
	if(lastScrollPos < curScrollPos) {
		//scroll down
		if(flag) {
			$("html, body").animate({ scrollTop: $(window).height() - $("#navigation").height() }, 800);
			setTimeout(function() {
				$( "#navigation" ).fadeTo( 200 , 1, function() {
    			// Animation complete.
  				});	
			}, 600);
			flag = false;
			flag2 = true;
		}
	} else {
		//scroll up
		console.log("body scrolltop: " + $("body").scrollTop());
		console.log("content offset y" + $("#content-wrapper").offset().top);

		if($("body").scrollTop() < ($("#content-wrapper").offset().top - 300) && flag2) { 	// -300 (threshold) to prevent early automated scrolling
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