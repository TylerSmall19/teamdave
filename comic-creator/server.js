var express = require('express');
var server = express();

server.get('/', function(request, response) {
  response.sendFile('public/index.html', {root: __dirname}, function(error) {
    if (error) {
      console.log(error);
      response.status(error.status).end();
    };
  });
});

server.use(express.static(__dirname + '/public'));
server.use(express.static(__dirname + '/public/img'))

server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});