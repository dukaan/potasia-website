$(document).ready(function() {
	$("#navigation").css({
		"opacity": "1"
	});

	$(".arrow-down").css({
    	"border-left": $(".active").width()/2 + "px solid transparent",
		"border-right": $(".active").width()/2 + "px solid transparent"
    });

    var options = {
                $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
                $AutoPlay: false,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlayInterval: 1500                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            };

            var jssor_slider1 = new $JssorSlider$("slider1_container", options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider to scale along with window
            function ScaleSlider() {
                var windowWidth = $(window).width();

                if (windowWidth) {
                    var windowHeight = $(window).height();
                    var originalWidth = jssor_slider1.$OriginalWidth();
                    var originalHeight = jssor_slider1.$OriginalHeight();

                    if (originalWidth / windowWidth > originalHeight / windowHeight) {
                        jssor_slider1.$ScaleHeight(windowHeight);
                    }
                    else {
                        jssor_slider1.$ScaleWidth(windowWidth);
                    }
                }
                else
                    window.setTimeout(ScaleSlider, 30);
            }

            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
});