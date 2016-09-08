//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(req, res) {
  var body = { a: 1 };
  var payload = JSON.stringify(body, null, 2);
  res.writeHead(200, {
    "Content-length": Buffer.byteLength(payload),
    "Content-Type": 'application/json'
  });
  res.write(payload);
  res.end();
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
