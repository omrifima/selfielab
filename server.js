const express = require("express");
 
const app = express();
 
app.use(express.static(__dirname + '/www'));
 
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/js', express.static(__dirname + '/www/js'));
app.use('/images', express.static(__dirname + '/www/images'));
 
var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
    
});