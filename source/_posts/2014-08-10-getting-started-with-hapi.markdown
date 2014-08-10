---
layout: post
title: "Getting Started with Hapi"
date: 2014-05-04 12:27
comments: true
categories: 
---

If I were to alter the content of my book _[Node.js Recipes](www.amazon.com/Node-js-Recipes-A-Problem-Solution-Approach/dp/1430260580)_ I would add more great examples of web frameworks. I've recently targeted several which I would love to use in upcoming projects. The first one I want to talk about is Hapi.

Hapi is a Node.js web framework that was developed by WalmartLabs/Spumko.

First you need to create a package.json file - `npm init` can help with this if you do not wish to configure your own.

    $> npm init
    you will then be walked through the process to generate your package.json file.

        {
          "name": "myHapiApp",
          "version": "0.0.0",
          "description": "Hapi",
          "main": "index.js",
          "scripts": {
              "test": ""
          },
          "author": "Cory Gackenheimer <c@cgack.com>",
          "license": "MIT"
        }
                                                                    
     Is this ok? (yes)

next you'll need it get Hapi this is done with the command:

    npm install hapi --save

Now you have `hapi` in your `node_modules` directory. You now need to create your server. 

        var Hapi = require('hapi');
            
        var server = Hapi.createServer('localhost', 8080);
                    
        server.start();

If you are to start this server `node .` or `node index.js` and navigate to `http://localhost:8080` at this point you would get `{"statusCode":404,"error":"Not Found"}` because you have not set up any routing in your server. To add routes you need to use the `server.route` method. Here I'll add a route we could use to simulate an API GET request, and the we'll also see serving files from a static directory.

    var Hapi = require('hapi');
                                                                                                        
    var server = Hapi.createServer('localhost', 8080);
                                                                                                                      
    server.route({
            method: 'GET',
            path: '/api/{path*}',
            handler: function(request, reply) {
                    reply('API request ' + request.url.path);
                }
    }); 
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './static',
                index: true
            }
        }
    });
                                                                                                    
    server.start();

Now if you navigate to `http://localhost:8080/api/foo` you will get a response with that path. If you instead try to hit a static page, i.e. `http://localhsot:8080/` -> `./static/index.html` you have set up in your local `./static` directory you will get that file returned to your web browser .

That is the quick getting started for Hapi if you want to use it to build a web server. I have enjoyed using it and the freedom it allows me to build my applications. I look forward to utilizing it more in future projects.
