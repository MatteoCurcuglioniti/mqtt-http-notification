// node ./nodejs_helloWorld.js

var http = require('http');
var util = require('util');
var fs   = require('fs');
var qs   = require('querystring');
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://test.mosquitto.org');

var server = http.createServer(function (request,response){
  //console.log(request);

  // parse the POST request
  var body = '';
  request.on('data', function(data){
    body += data;
    var post = qs.parse(body);    
    console.log('Received: '+post['message']);

    // publish the message
    console.log('Publishing Broker');
    client.subscribe('JustATest');
    client.publish('JustATest',post['message']);
  });


  // resend the page
  var rs = fs.createReadStream('./mqtt_http_example1.html');
  util.pump(rs, response);
});

server.listen(8001);

console.log("Running at http://127.0.0.1:8001/");
