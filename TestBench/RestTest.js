/**
 * Created by RKP on 8/26/2014.
 */
var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://localhost:8013',
    version: '~1.0'
});

client.get('/hello', function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Server returned: %j', obj);
});