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

function fileAccess(filepath){
  return new Promise((resolve,reject) => {
    fs.access(filepath, fs.F_OK, error => {
      if(!error){
        resolve(filepath);
      } else {
        reject(error);
      }
    })
  })
}

function streamFile(filepath) {
  return new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(filepath);

    fileStream.on('open', () => {
      resolve(fileStream);
    });
    fileStream.on('error', () => {
      reject(error);
    })

  })
}

function fileReader(filepath){
  return new Promise((resolve,resject) => {
      fs.readFile(filepath, (error,content) => {
        if(!error){
          resolve(content);
        } else {
          reject(error);
        }
      })
  })
}

function webServer(req,res){
    let baseURI = url.parse(req.url);
    let filepath = __dirname + (baseURI.pathname == '/' ? '/index.htm' : baseURI.pathname);
    let contentType = mime[path.extname(filepath)];

    fileAccess(filepath)
      .then(streamFile)
      .then(fileStream => {
        res.writeHead(200, { 'content-type' : contentType});
        //res.end(content,'utf-8');
        fileStream.pipe(res);
      })
      .catch(error => {
        res.writeHead(404);
        res.end(JSON.stringify(error));
      })
}

http.createServer(webServer).listen(3000, () => {
        console.log('Server up and running PORT 3000');
})
