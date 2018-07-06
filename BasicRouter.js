'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');

let routes = {
    'GET':{
        '/': (req,res) => {
            res.writeHead(200,{'content-type':'text/html'});
            res.write('<h1>Hello Routes</h1>')
        },
        '/api/getinfo':(req,res) => {
            res.writeHead(200,{'content-type':'application/json'});
            res.end("{'name':'Ankur Sharma','Age':14}");
        }
    },
    'POST':{
        '/api/login':(req,res) => {

        }
    },
    'NA':(req,res) => {
        res.writeHead(404,{'content-type':'text/html'});
        res.write('<h1 style="text-align: center">404 Bad Gateway</h1>\n<p style="text-align: center">Node.js server 8.11.3</p>');
    }
}

function router(req,res){
    let baseURI = url.parse(req.url, true);
    let resolveRoute = routes[req.method][baseURI.pathname];
    if(resolveRoute != undefined){
        resolveRoute(req,res);
    }else {

        routes['NA'](req,res);
    }
};

http
    .createServer(router)
    .listen(3000, () => {
        console.log('Server is up and running on PORT 3000');
    });
