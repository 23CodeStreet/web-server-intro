var express = require('express')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express()

var state = {
  messages: [{
		id: 0,
    username: 'Guy',
    text: 'Welcome to the chat',
  }]
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/chatapp.html');
});

app.get('/messages', function (req, res) {
	var lastSeenId = req.query.lastSeenId;
	var notSeen = [];
	for (var i = 0; i < state.messages.length; i = i + 1) {
		var m = state.messages[i];
		if (m.id > lastSeenId) {
			notSeen.push(m);
		}
	}
  res.json(notSeen);
});

app.post('/messages', function (req, res) {
	var newMessage = {};
	newMessage.username = req.body.username;
	newMessage.text = req.body.text;
	newMessage.id = state.messages.length;
	state.messages.push(newMessage);
	console.log('added new message', newMessage);
  res.send('OK');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
