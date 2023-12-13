var express = require('express');
var server = express(); // better instead
server.use('/media', express.static(__dirname + '/media'));
server.use(express.static(__dirname + '/public'));
server.listen(3000, ()=>{
    console.log("server listen on 3000")
});