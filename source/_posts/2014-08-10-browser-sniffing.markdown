---
layout: post
title: "Browser Sniffing"
date: 2013-11-27 12:23
comments: true
categories: 
---

Microsoft does many things decent, but browser detection in ASP.Net is not one of them. 

###The issue
In ASP.Net Microsoft heavily relies upon the use of browser sniffing to detect what browser you are using and throttles the features of the underlying ASP.Net web page accordingly. This normally isn't too much of a big deal even though it goes against the best practice of allowing for feature detection and providing an experience that is best suited for each browser. The issue that I am discussing in this post happened after Microsoft altered the User Agent string of Internet Explorer 11 in such a way that it is not supposed to look like Internet Explorer to those who sniff browsers. This causes and issue with Microsoft's own ASP.Net browser sniffing causing ASP.Net to disallow certain methods and postback handlers.

###The fix?
Microsoft knew about this and provided several "Future Proof" hotfixes to address this issue, but in my experience with sites that don't fully support ASP.Net 4.5 (limited in some cases by older Windows Server machines) these fixes don't work in all cases of IE11.

There are others on the web that have seen these issues and have tried to rectify by altering the ie.browser file (which is file that defines the regular expressions used to detect IE browsers). Most of these versions do not account for some Windows 8 and Windows 8.1 devices that have touch enabled. Now, one could totally account for these scenarios but it just adds to the natural fragility of browser sniffing and I personally opted for another method.

###Stop sniffing
The fix that works across the board is to just tell your ASP.Net application to treat everybrowser the same, then you can utilize feature detection to create the best experience for each browser. This can be down by doing something like:

`Page.ClientTarget = "uplevel";`

within the code behind of your page. Alternatively you could add this page directive directly into your aspx pages.

The moral here is that browser sniffing perpetuates headaches that could be better addressed in other places and it is way to fragile to always be "Future Proof".
