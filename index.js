//Lets require/import the HTTP module
var http = require('http');
var FB = require('fb');
var qs = require('querystring');

//Lets define a port we want to listen to
const PORT = process.env.PORT;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    if (request.method == 'GET') {
        FB.api('/213764485347352/events',
            function(res) {
                if (!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                var payload = JSON.stringify(res, null, 2);
                response.writeHead(200, {
                    "Content-length": Buffer.byteLength(payload),
                    "Content-Type": 'application/json'
                });
                response.write(payload);
                response.end();
            });
    }

    if (request.method == 'POST') {
        var body = '';

        request.on('data', function(data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function() {
            var post = JSON.parse(body);
            console.log("Post: " +
                post.value);
            console.log("Access token: " +
                post.accessToken);
            FB.setAccessToken(post.accessToken);
        });
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
