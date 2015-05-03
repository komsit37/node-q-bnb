var nodeq = require("node-q");
nodeq.connect({
	host: "localhost",
	port: 5555
}, function(err, con) {
	if (err) throw err;
	console.log("connected");
	// interact with con like demonstrated below
	con.k("sum 1 2 3", function(err, res) {
		if (err) throw err;
		console.log("result", res);
	});
	con.close(function() {
		console.log("con closed");
	});
});