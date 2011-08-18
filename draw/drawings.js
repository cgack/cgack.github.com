var Mode = { drawing: 0, write: 1 };

$(function () {            

	var ctx = document.getElementById("canvas").getContext("2d") 
		, canvas = document.getElementById("canvas")
		, $cvs = $("#canvas")
		, top = $cvs.offset().top 
		, left = $cvs.offset().left
		, draw = 0
		, mode = Mode.drawing
		, ctrlPressed = false; 
                   
    
	window.onpopstate = function (event) {
		if (event.state !== null) {							
			var img = new Image();
			$(img).load(function () {
				var ctx = document.getElementById("canvas").getContext("2d");
				ctx.drawImage(img, 0, 0);
			});
			img.src = event.state.imageData;
		}
	};
	
	$(window).resize(resizeCvs);

	var resizeCvs = function() {
		ctx.canvas.width = $(window).width();
		ctx.canvas.height = $(window).height();
		};
	
	var initializeCvs = function () {
		var mnu = $(".menu")[0];
		ctx.lineCap = "round";
		resizeCvs();
		ctx.save();
		ctx.fillStyle = '#fff';
		

		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.restore();
	};

	var blankCanvas = true;

	var storeHistory = function () {
		var img = document.getElementById("canvas").toDataURL("image/png");
		history.pushState({ imageData: img }, "i", window.location.href);
		$('#undo').removeAttr('disabled');
	};

	var undoDraw = function () {
		window.history.back();   
		$('#redo').removeAttr('disabled');      
	};

	var redoDraw = function () {
		window.history.forward();						
	};
	
	$cvs.mousedown(function (e) {
        if (e.button === 0) {
            if (blankCanvas) {
				storeHistory();
				blankCanvas = false;
			}
			switch (mode) {
				case Mode.drawing:
					draw = 1;
					ctx.beginPath();
					ctx.moveTo(e.pageX - left, e.pageY - top);
					break;
				case Mode.write:
					ctx.fillText(prompt('insert text', ''), e.pageX - left, e.pageY - top);
					storeHistory();
					break;
			}
        }
        else{
            draw = 0;
        }
    })
    .mouseup(function (e) {
        if(e.button === 0){
			switch (mode) {
				case Mode.drawing:
					draw = 0;
					ctx.lineTo(e.pageX-left+1, e.pageY-top+1);
					ctx.stroke();
					ctx.closePath();
					break;
				case Mode.write:
					break;
				}
			storeHistory();
        }
        else {
			draw = 1;
        }
    })
    .mousemove(function (e) {
        if(draw === 1){
			switch (mode) {
				case Mode.drawing:
					ctx.lineTo(e.pageX-left+1, e.pageY-top+1);
					ctx.stroke();
					break;
				case Mode.write:
					break;
			}
        }
    });

	$('#clear').click(function (e) {
        initializeCvs();
        $('#colors li:first').click();
        $('#brush_size').change();
    });
    
    $('#undo').click(function (e) {
    	e.preventDefault();
        undoDraw();
    });

	$("#redo").click(function (e) {
		e.preventDefault();
		redoDraw();								
	});
	
	$("#draw").click(function (e) {
		e.preventDefault();
		mode = Mode.drawing;
	});
	
	$("#text").click(function (e) {
		e.preventDefault();
		mode = Mode.write;
	});
	
	$("#colors li").click(function (e) { 
		e.preventDefault();
		mode = Mode.drawing;
		ctx.strokeStyle = $(this).css("background-color");
	});
	
	$("#fonts li").click(function (e) {
		e.preventDefault();
		mode = Mode.write;
		ctx.font = '18px ' + $(this).css("font-family");
	});

	$(document).keyup(function (e) { 
		if(e.which == 17) {
			ctrlPressed = false;
		} 
	})
	.keydown(function (e) { 
		if(e.which == 17) {
			 ctrlPressed = true; 
		}
		//ctrl + z
		if(e.which == 90 && ctrlPressed == true) {
			undoDraw(); 
		} 
		//ctrl + y
		if(e.which == 89 && ctrlPressed == true) {
			redoDraw(); 
		} 
	});

	initializeCvs();
});

