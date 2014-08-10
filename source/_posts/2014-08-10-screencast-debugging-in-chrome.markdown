---
layout: post
title: "Screencast Debugging in Chrome"
date: 2013-11-27 12:24
comments: true
categories: 
---
Remote debugging a few years ago was just a fledgling idea for most. WEINRE was leading the way with its remote access to mobile devices and worked well enough. In recent posts I have mentioned some improvements across various browsers and new tools that work well for developing and debugging on a mobile device. This area of developer tooling is continually improving and is becoming a more natural fit into a developers workflow.

One of the most recent advancements in remote debugging was announced in early October of this year, but I do not think that until the Chrome Dev Summit in November was it really noticed by a larger audience. This new tool allows you to connect your Android device running Chrome to your computer, Inspect it in dev tools and the chrome experience from the mobile device will be mirrored within the dev tools itself.

To do this, ensure USB debugging is enabled on your device and connect it to your computer. Then on a dev-tools experiments enabled computer navigate to chrome://inspect. You will see your device with any open Chrome tabs listed on this page.
{<1>}![](/content/images/2013/Nov/Screen_Shot_2013_11_29_at_8_20_27_AM-1.png)
now you will see the inspect link. You should click this and you will get your dev tools open. From here there is a little image that looks like a mobile device (blue in the image below) which will toggle the screencast.
{<2>}![Little Blue Phone](/content/images/2013/Nov/Screen_Shot_2013_11_29_at_8_28_10_AM.png)
Click that and you can now see the screencast of your mobile Chrome experience. 
{<3>}![Fixie Image](/content/images/2013/Nov/Screen_Shot_2013_11_29_at_8_24_19_AM.png)

Happy Debugging.
