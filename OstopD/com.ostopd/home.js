/*  Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var view = require('./staticView');
var db = require('./dbConfig/db');
var sessionConfig=require('./sessionConfig');

//for parsing application/json
app.use(bodyParser.json()); 

app.use(sessionConfig);


app.get('/ostopd', function(req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
	app.set('usrId', req.session.usr);
  	res.sendFile( view.get('view') + "home.html" );
		
});

app.get('/ostopD1', function (req, res) {
	console.log("/ostopD session :",req.session.userId);
  	res.sendFile( view.get('view') + "home.html" );
		
});

app.get('/getUserById', function (req, res) {
	console.log("In /getUserById handler" );
	var id=app.get('usrId');	
		console.log("In /getUserById id -",id);
		var	queryString="SELECT * FROM tbl_user_info where id="+id;
		console.log("Query..", queryString);
		
	db.query(queryString, function (err, result, fields) {
	    if (err){
	    	console.error(err);
	    	throw err;	    
	    }	     
	    if(result.length>0){
			    console.log(result);
			 res.json(result[0]);
			 	  
	    }else{
	       	res.json([]);
	    }	   
	  });
  	
		
});



//export this app to use in our login.js
module.exports = app;