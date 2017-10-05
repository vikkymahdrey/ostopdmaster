var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user: "root",
	password: "root",
	database: "ostopd"
});

connection.connect(function(err) {
    if (err) {
    	console.error("Database exception",err);
    	throw err;
    }
});

module.exports = connection;