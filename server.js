var express = require("express")
	stylus = require("stylus"),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
	return stylus(str).set("filename", path);
}

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware({
	src: __dirname + "/public",
	compile: compile
}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost/multi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting db...'));
db.once('open', function callback(){
	console.log('Connection successful...');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMesage;
Message.findOne().exec(function(err, messageDoc){
	mongoMesage = messageDoc.message;
});

app.get("/partials/:partialName", function(req, res){
	res.render("partials/" + req.params.partialName);
})
app.get("*", function(req, res){
	res.render("index", {
		mongoMessage: mongoMesage
	});
})

var port = 3030;
app.listen(port);

console.log("Server is up and running at http://localhost:" + port);