console.log("Aum Sree Sainath");

var http = require("http");


var services = {

}

function sendResults(res, params, status, statusText, headers, result) {
    // Send a HTTP response, with the given "status" code and a
    // "statusText" explanation, a "Connection:close" header so the
    // connection won't be kept alive, a "Content-Type:application/json"
    // header to specify the result type, some optional additional headers,
    // and a result (if any) in JSON or JSONP format.
}


function routeCall(req, res, body) {
    // Analyze the URL and the request body (if present) and the
    // pathname itself to get query parameters. Check whether the result
    // will be in JSON or JSONP format by seeing if a "callback" parameter
    // is given.
    //
    // If a "_method" parameter was included, let it override the
    // actual HTTP method.
    //
    // Analyze the URL to decide what service to call, and if
    // present in the "services" array above, dispatch the call to
    // it, with a callback pointing to the "sendResults" function;
    // otherwise, send back a 404 error.
}

process.on('uncaughtException', function(err) {
    // Provide for unexpected exceptions, so the server won't crash
    // Usually, report the error.
})

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);