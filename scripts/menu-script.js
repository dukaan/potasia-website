$(document).ready(function() {
	$("#navigation").css({
		"opacity": "1"
	});

	$(".arrow-down").css({
    	"border-left": $(".active").width()/2 + "px solid transparent",
		"border-right": $(".active").width()/2 + "px solid transparent"
    });

	$("#menu-title").animate({
		opacity: 1,
		bottom: "140",
		fontSize: "3em"
	}, 800, "easieEase");

	$("#menu-header").animate({
		opacity: 1
	}, 500);

});