'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mime = {
    '.htm':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.gif':'image/gif',
    '.jpg':'image/jpg',
    '.png':'image/png'
}

function webServer(req,res){
    let baseURI = url.parse(req.url);

    let filepath = __dirname + (baseURI.pathname == '/' ? '/index.htm' : baseURI.pathname);

    // check if requested file is accessible
    fs.access(filepath, fs.F_OK, error => {
        if(!error){
            fs.readFile(filepath, (error,content) => {
                if(!error){
                    console.log(filepath);
                    let contentType = mime[path.extname(filepath)];
                    res.writeHead(200, { 'content-type':contentType});
                    res.end(content,'utf-8');
                }else{
                    console.log('er');
                    // server a 500
                    res.writeHead(404,{'content-type':'text/html'});
                    res.write('<h1 style="text-align: center">Server cannot read requested content</h1>\n<p style="text-align: center">Node.js server 8.11.3</p>');

                }
            })

        }else {
            // server 404
            res.writeHead(404,{'content-type':'text/html'});
            res.write('<h1 style="text-align: center">402 Not Found</h1>\n<p style="text-align: center">Node.js server 8.11.3</p>');

        }
    });

}

http
    .createServer(webServer).listen(3000, () => {
        console.log('Server up and running PORT 3000');
})