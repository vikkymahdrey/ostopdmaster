var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');
var dt = require('./com.ostopd/js/dateTime');

http.createServer(function handler(req, res) {
	//res.writeHead(200, {'Content-Type': 'text/plain'});
	/*var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "ostopd"
		});

		con.connect(function(err) {
		  if (err) throw err;
		  con.query("SELECT * FROM tbl_user_info", function (err, result, fields) {
		    if (err) throw err;
		    console.log(result);
		  });
		});
	*/
	
	/* var q = url.parse(req.url, true);
	 var filename = "." + q.pathname;
	 console.log('URL as',filename);*/
	 
    fs.readFile('index.html', function(err, data) {
    	if(err){
    	      res.writeHead(404, {'Content-Type': 'text/html'});
    	      return res.end("404 Not Found");
    	}
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
   
   
}).listen(8000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8089/');
console.log('DateTime',dt.myDateTime());

