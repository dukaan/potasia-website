var lastScrollPos = 0;
var mapIsFixed = false;
var flag = true;
var flag2 = true;

$(document).ready(function() {
    // start view arrow button click
    $('#down-arrow-button').click(function() {
        $("html, body").animate({ scrollTop: $(window).height() - $("#navigation").height() - 400 }, 800);
            $( "#map-overlay" ).fadeTo( 800 , 0, function() {
                    // Animation complete.
                $( "#map-overlay" ).css({
                    "display" : "none"
                });
            });
            setTimeout(function() {
                $( "#navigation" ).fadeTo( 200 , 1, function() {
                    // Animation complete.
                });
        }, 600);
    });

	$("#navigation").css({
		"opacity": "1"
	});

	$(".arrow-down").css({
    	"border-left": $(".active").width()/2 + "px solid transparent",
		"border-right": $(".active").width()/2 + "px solid transparent"
    });

	function ScaleMap() {
		$("#map-canvas").css({
			"width" : $(window).width(),
			"height" : $(window).height()
		});

		$("#map-marker").css({
			"margin-left" : "-" + (($("#map-marker").width()/2)-7) + "px",		// substrate half the width to center x the map marker
			"top" : "calc(50% + 70px)"
		});

		initialize();
	}

	$(window).bind("load", ScaleMap);
    $(window).bind("resize", ScaleMap);
    $(window).bind("orientationchange", ScaleMap);

    console.log($("#map-overlay").height() + " " + ($("#map-marker").offset().top + $("#map-marker").height()));

});

function initialize() {

    // Create an array of styles.
    var styles = [
        {
            stylers: [
            /*
                { hue: "#801010" },
                { saturation: -25 }*/
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "on" }
            ]
        },{
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    var mapOptions = {
        center: new google.maps.LatLng(48.13715, 11.55583),
        zoom: 15,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
        },
        disableDefaultUI:true,
        zoomControl: true
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var myMapMarker = new google.maps.Marker({
        position: new google.maps.LatLng(48.12781, 11.55615),
        animation: google.maps.Animation.BOUNCE,
        map: map,
        title: "Potasia"
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}

// full page scroll
/*
$(document).on('scroll', function() {

        if($(window).scrollTop() > ($("#map-canvas").height() - 500) && !mapIsFixed) {
            $("#content-wrapper").addClass('fixed-map');
            $("#content-wrapper").css({
                "top" : -($("#map-canvas").height() - 500)
            });
            $("#contact-form-container").css({
                "margin-top" : $("#map-canvas").height() - 570
            });
            mapIsFixed = true;
            $( "#map-overlay" ).fadeTo( 200 , 0, function() {
                $( "#map-overlay" ).css({
                    "display" : "none"
                });
            });
            $(window).scrollTop(0);
        }

});*/

// full page scroll
$(document).on( 'scroll', function() {

    var curScrollPos = $(this).scrollTop();
    if(lastScrollPos < curScrollPos) {
        //scroll down
        if(flag) {
            $("html, body").animate({ scrollTop: $(window).height() - $("#navigation").height() - 400 }, 800);
            $( "#map-overlay" ).fadeTo( 800 , 0, function() {
                    // Animation complete.
                $( "#map-overlay" ).css({
                    "display" : "none"
                });
            });
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

        if( $('body').scrollTop() === 0) {
            $( "#map-overlay" ).fadeTo( 200 , 1, function() {
                    // Animation complete.
                    initialize();
            }); 
            flag = true;
        }
    }
    lastScrollPos = curScrollPos;
});