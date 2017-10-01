/*   Document   : NodeJS / Express web server
    Created on : 29th Sept 2017, 13:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'com.ostopd')));
app.set('view', path.join(__dirname, 'com.ostopd/view/'));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


app.get('/', function (req, res) {
  // res.send('Hello World');
   //res.render('App.jsx');
	res.sendFile( app.get('view') + "login.html" );
		console.log("URL :",req.path);
});



var server = app.listen(8070, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});