var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

var vote = {
	Zefren: 0,
	Kirai: 0,
	Extarns: 0
}

//sockets

io.sockets.on('connection',function(socket){
	socket.on('user image',function(image){
		io.sockets.emit('addimage','Nouvel album : ',image);
	});
	socket.on('vote', function(data){
		console.log(data);
		vote[data]++;
		io.sockets.emit('updateVote', vote);
	});
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

/*
http.listen(3000,function(){
	console.log("Listening on port 3000");
});
*/

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app started!')
});
