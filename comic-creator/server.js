var express = require('express');
var server = express();

server.get('/', function(request, response) {
  response.sendFile('./index.html', {root: __dirname}, function(error) {
    if (error) {
      console.log(error);
      response.status(error.status).end();
    };
  });
});

server.use(express.static('.'));

server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});