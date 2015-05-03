var express = require('express');
var app = express();
var nodeq = require("node-q");

//----------------------------------- router -------------------------------------
var router = express.Router();

//**order matters - this needs to come first
// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log('request', req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

//just execute the query extracted from url string and return result
router.get('/:x', function(req, res) {
	console.log(req.params.x);
	q.k(req.params.x, function(err, qres){respond(res, err, qres);});	//don't like this but we need res from parent scope to send result back
});

app.use('/api', router);


//----------------------------------- functions -------------------------------------
var respond = function(res, err, qres) {
	if (err) {
		console.log(err);
		res.send(String(err));
		return;
	}
	//console.log('result', qres);
	res.jsonp(qres);
};


//----------------------------------- start up -------------------------------------
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('node-q listening at http://%s%s', host, port);
});

var q;
nodeq.connect({
	host: "localhost",
	port: 5555
}, function(err, con) {
	if (err) throw err;
	console.log("Connected kdb on %s:%s", con.socket.remoteAddress, con.socket.remotePort);
	// interact with con like demonstrated below
	q = con;
});