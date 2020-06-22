var express = require('express')
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

app.get('/', function (req, res) {
  var name = req.query.name;
  if (!name) {
    name = "Unknown Person";
  }
  res.render('hello', {name: name});
});

app.get('/test', function (req, res) {
  console.log(req.query);
  res.send('OK');
});

app.post('/somedata', function (req, res) {
  console.log(req.body);
  res.send('OK');
});

app.get('/chat', function (req, res) {
  res.render('chat', {messages: state.messages});
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
