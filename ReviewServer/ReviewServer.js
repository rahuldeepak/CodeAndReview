console.log("Aum Sree Sainath");


var restify = require('restify');
var http = require("http");
var multipart = require('multipart');
var sys = require('sys');


// State
var next_user_id = 0;
var users = {};

// Server
var server = restify.createServer({
    name: 'ReviewServer',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("/", function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(users));
    return next();
});

server.get('/user/:id', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
    return next();
});

server.post('/upload', function (req, res, next) {

    console.log("Function got called");

    req.setBodyEncoding('binary');
    var stream = new multipart.Stream(req);

    stream.addListener('part', function(part) {

        part.addListener('body', function(chunk) {
            var progress = (stream.bytesReceived / stream.bytesTotal * 100).toFixed(2);
            var mb = (stream.bytesTotal / 1024 / 1024).toFixed(1);

            sys.print("Uploading "+mb+"mb ("+progress+"%)\015");

            // chunk could be appended to a file if the uploaded file needs to be saved
        });
    });


    stream.addListener('complete', function() {
        res.sendHeader(200, {'Content-Type': 'text/plain'});
        res.sendBody('Thanks for playing!');
        res.finish();
        sys.puts("\n=> Done");
    });


    return next();
});

server.post('/user', function (req, res, next) {
    var user = req.params;
    user.id = next_user_id++;
    users[user.id] = user;
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(user));
    return next();
});

server.put('/user/:id', function (req, res, next) {
    var user = users[parseInt(req.params.id)];
    var changes = req.params;
    delete changes.id;
    for (var x in changes) {
        user[x] = changes[x];
    }
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(user));
    return next();
});

server.del('/user/:id', function (req, res, next) {
    delete users[parseInt(req.params.id)];
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(true));
    return next();
});

server.listen(8013, function () {
    console.log('%s listening at %s', server.name, server.url);
});


