'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

const path = require('path');
const express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");  // 파일 열기 위한 모듈
//var engines = require('consolidate');
const cors = require('cors'); 
app.use(cors());
app.use(bodyParser.json());





//const charset =require('charset');
app.set('socket.io', io);

app.set('views', __dirname + '/views');

/*
// 화면 engine을 html로 설정
app.engine('html', engines.mustache);
app.set('view engine', 'html');
*/
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



var server = app.listen(3000, () => {
    console.log("The server is running on Port 3000");
});


app.use(express.static('public'));

app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@YUJIN##$',
    resave: false,
    saveUninitialized: true
}));
//secret >> 쿠키 임의 변조 방지
//resave >> 세션을 언제나 저장할지 말지 정함 false 권장
//saveUninitialized >> 변경되지 않은 세션


var router = require('./router/main')(app, fs); // bodyparser 설정 아래 부분에 있으면 제대로 작동 안함
//server.use(express.static('public'));

var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {

  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    socket.broadcast.emit('message', message);
  });


  
  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else {
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces(); 
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });

});