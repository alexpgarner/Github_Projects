const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  const readWrite = function(file,dataType){
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': dataType});
      res.write(data);
      res.end();
    });
  }
  switch(page){
    case '/':
      readWrite('index.html','text/html');
      break;
    case '/otherpage':
      readWrite('otherpage.html','text/html');
      break;
    case 'otherotherpage':
      readWrite('otherotherpage.html','text/html');
      break;
    case '/api':
      if(params['student']== 'flip'){
        let headsTails;
        if(Math.random()>=.5){
          headsTails = 'HEADS';
        }else{
          headsTails = 'TAILS';
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: headsTails
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readWrite('js/main.js','text/javascript');
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
});

server.listen(8000);
