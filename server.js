'use strict';

const http = require('http');

// Node.js server instance
http
    .createServer((req,res) => {
        res.writeHead(200,{'content-type':'text/html'});
        res.write('<h1>Welcome to Node.js Server</h1>')
    })
    .listen(3000, () => {
        console.log('Server is up and running at 3000');
    });
