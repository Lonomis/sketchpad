$(document).ready(function() {
	const cWidth = 500;
	const cHeight = 500;

	$("#reset").on("click",function() {
		initialize();
	});

	function initialize() {
		var nGrid = (prompt("How many square per side?")||1);
		var nSize = cWidth/nGrid;
		var $canvas = $(".canvas")||null;
		var aPixels = [];
		var random255 = genRandom(255);

		if($canvas) {
			$canvas.remove();
		}

		$("#status").text("off")
				.attr("status","off");

		$(".container").append($("<div></div>").addClass("canvas"));
		for(var h=0;h<cHeight;h+=nSize) {
			for(var w=0;w<cWidth;w+=nSize) {
				var nWOver = (cWidth-(w+nSize)<0 ? cWidth-(w+nSize) : 0);
				var nHOver = (cHeight-(h+nSize)<0 ? cHeight-(h+nSize) : 0);
				aPixels.push($("<div></div>").addClass("pixel")
											 .css("width",nSize+nWOver)
											 .css("height",nSize+nHOver));
			}
		}
		for(var i in aPixels) {
			$(".canvas").append(aPixels[i]);
		}

		$(".pixel").on("mouseover",function() {
			var $status = $("#status");
			var rgb = [random255(),random255(),random255()].join(",");

			if($status.attr("status") === "on") {
				$(this).css("background-color","rgb("+rgb+")");
			}
		});

		$(".canvas").on("click", function() {
			var $status = $("#status");

			if($status.attr("status") === "on") {
				$status.text("off")
					   .attr("status","off");
			}else {
				$status.text("on")
					   .attr("status","on");
			}
		});
	}

	initialize();
});

function genRandom(nNumber) {
	return function() {
		return Math.ceil(Math.random()*nNumber);
	}
}