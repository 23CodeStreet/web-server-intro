var express = require('express')
var cors = require('cors')
var mustache = require('mustache-express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;


var state = {
  messages: [{
		id: 0,
    username: 'Guy',
    text: 'Welcome to the chat',
  }]
};

var app = express()
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function (req, res) {
  res.render('chat', {messages: state.messages});
});

app.get('/querytest', function (req, res) {
  console.log(req.query);
  res.send('OK');
});

app.post('/bodytest', function (req, res) {
  console.log(req.body);
  res.send('OK');
});

app.post('/messages', function (req, res) {
	var newMessage = {};
	newMessage.username = req.body.username;
	newMessage.text = req.body.text;
	newMessage.id = state.messages.length;
	state.messages.push(newMessage);
  res.send('OK');
});

app.get('/messages', function (req, res) {
  var lastSeenID = req.query.lastSeenID || -1;
  var response = {
    messages: [],
  };
  for (var i = 0; i < state.messages.length; i++) {
    var m = state.messages[i];
    if (m.id > lastSeenID) {
      response.messages.push(m);
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
