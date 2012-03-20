---
layout: post
title: "DeviceOrientation Events"
date: 2012-01-27 18:04
comments: true
categories: 
---

The Mozilla Dev Derby is a pretty cool thing.  Developers from around the world can openly add any demo to the site, and if their demo lines up with the prescribed derby for the month, they are automatically entered to win a prize (t-shirt, cool bag, android device).  I decided I would enter again for the January 2012 derby based on Orientation.  I made two demos.  


###catch 

The first one called "Catch" which you are attempting to catch a randomly generated ball in the shortest amount of time possible. I have personally found it incredibly addicting to get the perfect game, or at least my best attempt at it and I even wrote the source code.  What I learned in developing this app was a couple of things.  One, there isn't a ton of documentation on the web about the DeviceOrientationEvent.  Two, its pretty straightforward to detect the orientation and utilize it to move an object.  Here is the basic of my app:
	 /*orientation stuffs*/
  	var initOrientation = function() {
		var count = 0, gam = 0, bet = 0;
		if (window.DeviceOrientationEvent) {
			window.addEventListener("deviceorientation", function(e) {
				//gamma = left to right
				//beta = front back
				//alpha = compass dir
				count = count + 1;
				gam += e.gamma;
				bet += e.beta;

				if (count === 0 || count % 10 === 0) {
					orientationYo(gam, bet);
					gam = 0;
					bet = 0;
				}
			}, false);
		}
	};

	//handle orientation
	var orientationYo = function(ltr, ftb) {
		coor.x = coor.x + ltr;
		coor.y = coor.y + ftb;
		if (!gameState.victory && gameState.playing) {
			tgt.move(coor);   
		}
	};

so that handles the detection of the orientation event, next I simply added the move call to my target (tgt) which looks like this:
	var tgt = {
		isDrawing: false,
		collided: false,
		start: function(coordinates) {
		  	this.drawIt(coordinates);
			this.isDrawing = true;
		},
		drawIt: function (coordinates) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			ctx.fillStyle = b2_color;
			ctx.beginPath();
			ctx.arc(coordinates.x, coordinates.y, 25, 0, Math.PI * 2, true);
			ctx.fill();
		},
		move: function(coordinates) {
			if (this.isDrawing) {
			  this.checkBounds(coordinates);
			  this.drawIt(coordinates);
			}
		},
		finish: function(coordinates) {
			this.isDrawing = false;
			ctx.lineTo(coordinates.x, coordinates.y);
			ctx.stroke();
			ctx.closePath();                
		},
		checkBounds: function(coordinates) {
			 if (coordinates.y > bound.y2) {
				coordinates.y = bound.y2;
			  } else if (coordinates.y < bound.y1) {
				coordinates.y = bound.y1;
			  } else if (coordinates.x > bound.x2) {
				coordinates.x = bound.x2;
			  } else if (coordinates.x < bound.x1) {
				coordinates.x = bound.x1;
			  }
		}
  	};

collision detection is handled by my randomly placed bouncing ball, which detects when the target ball moves into its path:
	checkObjectCollisions: function() {
		var imgData = ctx.getImageData(this.position.x + this.velocity.x1, this.position.y + this.velocity.x2, r, r),
			pix = imgData.data;
		for (i = 0, n = pix.length; i < n; i += 4) {
			if (pix[i] !== 0) {
				this.collided = true;
				if (Math.abs(this.velocity.x1) > Math.abs(this.velocity.x2)){
					this.velocity.x1 = -this.velocity.x1 * drag;
				} else {
					this.velocity.x2 = -this.velocity.x2 * drag;
				}
				break;
			} else {
				this.collided = false;
			}
		}
	}

I am pretty happy with the game, its clean and works nicely.  You can check it out [here](https://developer.mozilla.org/en-US/demos/detail/catch)

###compass

The other is a simple web compass where I utilize the DeviceOrientationEvent to get the [cardinal direction your phone or device is facing](https://developer.mozilla.org/en-US/demos/detail/simple-compass).  There are two cool (in my opinion) things that happened here.  One is that to me it seems the device orientation event as defined states that the DeviceOrientationEvent.alpha ranges from 0 to 360 which to me is a 361 degree circle.  The second is that I was able to utilize the offline caching capabilities of the modern web to make the compass available to a device event when not connected to the internet.  This is done in minimal lines of code.  The HTML and JavaScript are as follows:

	<!-- This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this file,
 	You can obtain one at http://mozilla.org/MPL/2.0/.  -->

	<!DOCTYPE html>
	<html manifest="compass.appcache">
	<head>
	<meta charset=utf-8 />
	<title>Cardinal Direction Compass</title>
	<style>
	  .pointer {
	    height: 0;
	    width: 0;
	    border-left: 3em solid transparent;
	    border-right: 3em solid transparent;
	    border-bottom: 12em solid black;
	    margin: -10px 0 0 -40px;
	    top: 40%;
	    left: 50%;
	    position: absolute;
	  }
	  .n {
	    top: 20%;
	    left:50%;
	    position:absolute;
	    font:8em Helvetica;
	    margin: 0 0 0 -40px;
	  }
	  </style>
	  <script src="js/jquery.js"></script>
	</head>
	<body>
	  <div class="n">N<br><br><br><br>S</div>
	  <div class="pointer"></div>
	<script>
			$(document).ready(function() {

			  var rotate = function (deg) {  
			      $(".n").css({ "-moz-transform": "rotate(0deg)"});
			      $(".n").css({ "-moz-transform": "rotate(" + deg + "deg)"});
			    
			      $(".n").css({ "-o-transform": "rotate(0deg)"});
			      $(".n").css({ "-o-transform": "rotate(" + deg + "deg)"});
			    
			      $(".n").css({ "-ms-transform": "rotate(0deg)"});
			      $(".n").css({ "-ms-transform": "rotate(" + deg + "deg)"});
			    
			      $(".n").css({ "-webkit-transform": "rotate(0deg)"});
			      $(".n").css({ "-webkit-transform": "rotate(" + deg + "deg)"});
			    
			      $(".n").css({ "transform": "rotate(0deg)"});
			      $(".n").css({ "transform": "rotate(" + deg + "deg)"});
			  };
			  if (window.DeviceOrientationEvent) {
			    window.addEventListener("deviceorientation", function (e) {
			      rotate(360 - e.alpha);
			    }, false);
			  }
			  
			});
			</script>
	  </body>
	</html>


The final point I'd like to make is that due to what I thought was minimal documentation, I participated in a Mozilla Doc Sprint last weekend to update the Documentation surrounding the DeviceOrientationEvent. Doing my part in the web development community was both rewarding and a learning experience. I encourage anyone to try it out as well.