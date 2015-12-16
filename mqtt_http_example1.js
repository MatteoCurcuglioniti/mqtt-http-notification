// node ./nodejs_helloWorld.js

var http = require('http');
var util = require('util');
var fs   = require('fs');
var qs   = require('querystring');
var mqtt = require('mqtt');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
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

server.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

console.log("Running at http://127.0.0.1:8001/");
