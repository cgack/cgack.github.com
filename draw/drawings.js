/* ***** BEGIN LICENSE BLOCK *****
 Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
 The contents of this file are subject to the Mozilla Public License Version 
 1.1 (the "License"); you may not use this file except in compliance with 
 the License. You may obtain a copy of the License at 
 http://www.mozilla.org/MPL/
 
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the
 License.
 
 The Original Code is drawings.
 
 The Initial Developer of the Original Code is
 cgack.
 Portions created by the Initial Developer are Copyright (C) 2011
 the Initial Developer. All Rights Reserved.
 
 Contributor(s):
 Cory Gack

 Alternatively, the contents of this file may be used under the terms of
 either the GNU General Public License Version 2 or later (the "GPL"), or
 the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 in which case the provisions of the GPL or the LGPL are applicable instead
 of those above. If you wish to allow use of your version of this file only
 under the terms of either the GPL or the LGPL, and not to allow others to
 use your version of this file under the terms of the MPL, indicate your
 decision by deleting the provisions above and replace them with the notice
 and other provisions required by the GPL or the LGPL. If you do not delete
 the provisions above, a recipient may use your version of this file under
 the terms of any one of the MPL, the GPL or the LGPL.
 
 ***** END LICENSE BLOCK ***** */

$(function () {  

	var Mode = { drawing: 0, write: 1 };

	var ctx = document.getElementById("canvas").getContext("2d")
		,canvas = document.getElementById("canvas")
		,$cvs = $("#canvas")
		,img
		,top = $cvs.offset().top
		,left = $cvs.offset().left
		,draw = 0
		,mode = Mode.drawing
		,curFont = "Helvetica"
		,curFontSz = "18px"
		,ctrlPressed = false
		,histCount = 1
		,blankCanvas = true;


	var resizeCvs = function() {
		ctx.canvas.width = $(window).width();
		ctx.canvas.height = $(window).height();
		};
	
	var initializeCvs = function (clearing) {
		var mnu = $(".menu")[0];
		ctx.lineCap = "round";
		resizeCvs();
		ctx.save();
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.restore();

		if (window.localStorage && !clearing) { 
			img = new Image();
			$(img).load(function () {
				ctx.drawImage(img, 0, 0);
			});
			if (localStorage.curImg) {
				img.src = localStorage.curImg;		
				blankCanvas = false;
			}
		}
		if (clearing) { storeHistory(); }
	};

	var storeHistory = function () {
		img = canvas.toDataURL("image/png");
		history.pushState({ imageData: img }, "i", window.location.href);
		histCount++;
		if (window.localStorage) { localStorage.curImg = img; }
	};

	var undoDraw = function () {
		window.history.back();
		histCount--;
	};

	var redoDraw = function () {
		window.history.forward();
		histCount++;
	};
	
	var backout = function () {
		window.history.go("-" + histCount);	
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
					ctx.fillText(prompt('Text to Insert', ''), e.pageX - left, e.pageY - top);
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
		initializeCvs(true);
	});
	
	$('#undo').click(function (e) {
		e.preventDefault();
	undoDraw();
	});

	$("#redo").click(function (e) {
		e.preventDefault();
		redoDraw();								
	});

	$("#backout").click(function (e) {
		e.preventDefault();
		backout();
	});	
	
	$("#draw").click(function (e) {
		e.preventDefault();
		$("label[for='sizer']").text("Line Size:");
		mode = Mode.drawing;
	});
	
	$("#text").click(function (e) {
		e.preventDefault();
		$("label[for='sizer']").text("Font Size:");
		mode = Mode.write;
	});
	
	$("#colors li").click(function (e) { 
		e.preventDefault();
		$("label[for='sizer']").text("Line Size:");
		mode = Mode.drawing;
		ctx.strokeStyle = $(this).css("background-color");
	});
	
	$("#fonts li").click(function (e) {
		e.preventDefault();
		$("label[for='sizer']").text("Font Size:");
		mode = Mode.write;
		curFont = $(this).css("font-family");
		ctx.font = curFontSz + " " + curFont;
	});
	
	$("#sizer").change(function (e) {
		switch(mode) {
			case Mode.drawing:
				ctx.lineWidth = parseInt($(this).val(), 10);
				break;
			case Mode.write:
				curFontSz = parseInt($(this).val(), 10) + "px";
				ctx.font = curFontSz + " " + curFont;
				break;
		}
	});

	$(document).keyup(function (e) { 
		if(e.which === 17) {
			ctrlPressed = false;
		} 
	})
	.keydown(function (e) { 
		if(e.which === 17) {
			 ctrlPressed = true; 
		}
		//ctrl + z
		if(e.which === 90 && ctrlPressed === true) {
			undoDraw(); 
		} 
		//ctrl + y
		if(e.which === 89 && ctrlPressed === true) {
			redoDraw(); 
		} 
	});

	initializeCvs();
	
	window.onpopstate = function (event) {
		if (event.state !== null) {
			img = new Image();
			$(img).load(function () {
				ctx.drawImage(img, 0, 0);
			});
			img.src = event.state.imageData;
		}
	};
	
	window.onresize = function() {
		resizeCvs();
		if (window.localStorage) {
			img = new Image();
			$(img).load(function () {
				ctx.drawImage(img, 0, 0);				
			});
			if (localStorage.curImg) {
				img.src = localStorage.curImg;		
			}
		}
	};
});

