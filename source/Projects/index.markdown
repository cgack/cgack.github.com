---
layout: page
title: "Projects"
date: 2011-10-09 09:31
comments: true
sharing: true
footer: true
---
## Canvas Drawing Demo
This Demo is a simple canvas drawing demo origianlly created for a Preschooler.  I used the History API to allow for undo [browser back OR ctrl + z] and redo [browser fwd OR ctrl + y].  It won the [August Dev Derby](https://developer.mozilla.org/demos/devderby/2011/august).  Check it out [here](../draw/) 

##Orientation Demos
Another Dev Derby Entry I submitted was for device orientation.  I utilized the device orientation event to control a ball on an html canvas element that is used to catch a target ball.  The goal is to do it quickly.  If you device doesn't support orientation events you can click/tap to change the location of the ball, and you may also control the location using the keyboard H, J, K, L keys.  The Dev Derby entry is [here](https://developer.mozilla.org/demos/devderby/2012/january) and my github hosted version is [here](../catch).

In the above demo I did not utilize the DeviceOrientationEvent.alpha parameter which is basically the cardinal direction of your device (think compass).  So I created a simple compass out of the orienation api which can be found [here](../cardinal).
