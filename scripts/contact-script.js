$(document).ready(function() {
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
                { hue: "#801010" },
                { saturation: -100 }
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
        title: "Quantuan"
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}