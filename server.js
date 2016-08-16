const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Timer = require('./models/timer');

const USERNAME = process.env.MLAB_USERNAME;
const PASSWORD = process.env.MLAB_PASSWORD;

mongoose.connect('mongodb://' + USERNAME + ':' + PASSWORD + '@ds015750.mlab.com:15750/basetimer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	app.listen(process.env.PORT || 3000, () => {
		console.log('listening on ' +  process.env.PORT || '3000');
	});
});


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('views'));

// Handlers

app.get('/', (req, res) => {
	console.log('GET /');
	res.render('index');
});

app.get('/viewtimer/:name', (req, res) => {
	console.log('GET /viewtimer/ : ' + req.params.name);
	Timer.findOne({name: req.params.name}, (err, timer) => {
		if (err) { return console.error(err); }
		res.send({timer});
	});
});

app.post('/newtimer', (req, res) => {
	console.log('POST /newtimer');
	req.body.last_time = Date.now();
	var new_timer = new Timer({
		name: req.body.name,
		last_time: req.body.last_time
	});
	new_timer.save((err, new_timer) => {
		if (err) {
			console.error(err);
			// res.statusText = 'Error';
			return res.sendStatus(1226);
		}
		return res.sendStatus(1337);
	});
});

app.put('/updatetimer/:name', (req, res) => {
	console.log('UPDATE /updatetimer/ : ' + req.params.name);
	req.body.last_time = Date.now();
	Timer.findOneAndUpdate(
		{name: req.params.name},
		{$set: {last_time: req.body.last_time}},
		{new: true},
		(err, timer) => {
			if (err) { return console.error(err); }
			res.send({timer});
		}
	);
});


// app.delete('/delete', (req, res) => {
// 	db.collection('base').findOneAndDelete({name: req.body.name}, (err, result) => {
// 		if (err) { return res.send(500, err); }
// 		res.send('A timer got deleted');
// 	});
// });
