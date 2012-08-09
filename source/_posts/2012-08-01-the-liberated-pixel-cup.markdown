---
layout: post
title: "The Liberated Pixel Cup"
date: 2012-08-01 17:37
comments: true
categories: 
---


July marked the beginning of the coding portion of the [Liberated Pixel Cup](http://lpc.opengameart.org) which is an amazing two-part competition that involves amazing artists creating open game assets during part one (June) which developers then take to create a game based on those assets (July). I first heard about the Liberated Pixel Cup a few weeks into the second part of the competition. After a day or two of contemplating if I could get a game off the ground in time, decided to make an HTML5 game. Other than my orientation demo [Catch](http://cgack.com/catch) and the node.js interpretation of the card game [Wizard](http://wiz.jit.su), I had not made (or at least published) what I would consider a graphics based, animated, HTML5 game.  I decided to take this opportunity to dive in head first.

Over the last few years, I have seen quite a few HTML5 game engines come around and have taken note of many, experimented with some. The big name in the HTML5 engine space right now seems to be [ImpactJS](http://impactjs.com/) which I have yet to use, but of the ones with which I have experimented,[cocos2dx-html](http://cocos2d-x.org) and [melonJS](http://melonjs.org), I chose melonJS. I decided that to get an RPG style game with the assests provided in the competition playable in the limited development time that I had, melonJS fit that need perfectly. So now I can kill two birds with one stone, get an HTML5 game built and get more familiar with one of the HTML5 engines I have been eyeing for some time.

So I spent my evenings and weekends for the last couple weeks doing quite a bit of hacking. First I had to familiarize myself with making some tilemaps for the different world areas within the game that I wanted to create, figure out how that tied in with the melonJS framework that I was trying to learn, and create a simple story in the game which could be completed before interest is lost. Creating the tilemaps was easy, and the way in which melonJS incorporates them into the game is slick and effective. A couple things which weren't clear from the melonJS documentation were 1) dynamically adding projectiles or arbitrary objects (such as the magic in my game) to the screen, and 2) how to get the level transitions to behave how I wanted.  The first was pretty simple in the end, all I needed to do was check if my player had the magic, check direction, create & align, add it and make sure it displays on the scene:

	 if (me.game.STATE.weaponState === "magic_torrentacle") {
	    if (this.direction === "west") {
	        magic = new MagicEntity(this.pos.x - 100, this.pos.y + 30 , { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128});
	        magic.flipX(true);
	        me.game.add(magic, this.z);
	        me.game.sort();
	    } else if (this.direction === "east") {
	        magic = new MagicEntity(this.pos.x + 42, this.pos.y + 30, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
	        me.game.add(magic, this.z);
	        me.game.sort();
	    } else if (this.direction === "south") {
	        magic = new MagicEntity(this.pos.x - 24 , this.pos.y + 100, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
	        me.game.add(magic, this.z);
	        me.game.sort();
	    } else if (this.direction === "north" ) {
	        magic = new MagicEntity(this.pos.x - 24, this.pos.y - 30, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
	        me.game.add(magic, this.z);
	        me.game.sort();
	    }
	}

The other major hurdle I faced was the scenes when jumping from one map to another would sometimes immediately jump to a completely different map. This seemed like a bug and was so inconsistent I nearly scrapped the whole project, but as it turns out, a few of my enemies were walking their boundaries to the point where the level transitions began, triggering a random map change as if it were the main player. So that was a quick fix (once I figured it out). I do hope to add some more fun to it as time goes on, and welcome any contributors to expanding it to whatever it becomes. So go ahead and [Fork it](https://github.com/cgack/libpx).

I cannot thank the other contributors to the competition enough, they are a cheery bunch on IRC who have donated time and talent to a really cool open game competition.

So now you know a bit of the backstory that led up to [Pixel Quest](http://cgack.com/libpx), my HTML5 entry in the 2012 Liberated Pixel Cup.  