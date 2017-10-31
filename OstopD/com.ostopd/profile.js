/*  Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var view = require('./staticView');
var db = require('./dbConfig/db');
var sessionConfig=require('./sessionConfig');

app.use(sessionConfig);
//for parsing application/json
app.use(bodyParser.json()); 



app.get('/getProfile', function (req, res) {
	console.log("In /getProfile handler" );
	app.set('usrId', req.session.usr);
  	res.sendFile(view.get('view') + "UserProfile.html" );
		console.log("URL :",req.path);
});

app.post('/editCity', function(req, res){
	console.log("In /editCity handler");
	var id=app.get('usrId');
		
	     var cId=req.body.cId;
		    var sId=req.body.sId;
				var cityId=req.body.cityId;
				
												
						console.log("cId",cId);
						console.log("sId",sId);
						console.log("cityId",cityId);
							res.json('Successfully updated');
		/*				
		var queryString="";
		console.log("Query..", queryString);
						
			db.query(queryString, function (err, result, fields){
			    if(err){
			    	console.error(err);
			    	throw err;	    
			    }	
			    console.log("resultant result",result);
			    if(result.length>0){
					     res.json(result[0]);		    	 
			    }else{			    	
			    	res.json('Updation failed!');
			    }	   
			  });
		
					*/	
						
	
	});

module.exports = app;