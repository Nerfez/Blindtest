var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
	res.send('Hello World!')
    res.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

var vote = {
	Zefren: 0,
	Kirai: 0,
	Extarns: 0
}

io.on('connection', function (socket) {
    console.log("a user is connected");
	socket.on("vote", function(data){
		vote[data]++;
		io.emit("updateVote", vote);
	})
})

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app started!')
})