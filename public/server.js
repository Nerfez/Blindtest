var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

var vote = {
	Kirai: 0,
	Oinnez: 0,
	Mattéo: 0,
	Extarns: 0
}

//sockets

io.sockets.on('connection',function(socket){
	
	// Every socket connection has a unique ID
    console.log('new connection: ' + socket.id);
	
	//Récupération de l'image
	socket.on('user image',function(image){
		io.sockets.emit('addimage','Nouvel album : ',image);
	});
	
	//Alimente les votes
	socket.on('vote', function(data){
		vote[data]++;
		io.sockets.emit('updateVote', vote);
	});
	
	//Décrémente les votes
	socket.on('voteDown', function(data){
		vote[data]--;
		io.sockets.emit('updateVote', vote);
	});
	
	//pseudonyme s'est connecté
	socket.on('user name', function(data){
		io.sockets.emit('updateNewPlayer', data);
	});
	
	//add message
	socket.on('user message', function(NamePlayer,MyMessage){
		io.sockets.emit('updateNewMessage', NamePlayer, MyMessage);
	});
	
	//del message
	socket.on('delete message', function(data){
		io.sockets.emit('delete chat', data);
	});
	
	//réponse trouvée Chanteur
	socket.on('correct singer', function(NamePlayer, MyMessage){
		io.sockets.emit('correct Singer', NamePlayer, MyMessage);
	});
	
	//réponse trouvée Album
	socket.on('correct album', function(NamePlayer, MyMessage){
		io.sockets.emit('correct Album', NamePlayer, MyMessage);
	});
	
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


http.listen(3000,function(){
	console.log("Listening on port 3000");
});

/*
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app started!')
});
*/
