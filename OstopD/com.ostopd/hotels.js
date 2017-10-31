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


app.get('/getHotels', function (req, res) {
	console.log("In /getHotels handler" );
	console.log("In /getHotels session",req.session.usr );
  	res.sendFile(view.get('view') + "Hotels.html" );
		console.log("URL :",req.path);
});



app.post('/getHotelsByCityId', function (req, res) {
	 console.log("In /getHotelsByCityId handler" );
	 var cityId=req.body.cityId;
	 
	 console.log("In cityId",cityId);
		var	queryString="SELECT * FROM tbl_city_address_type where city_id="+cityId+" and address_type_id=1";
		console.log("Query..", queryString);
		
	db.query(queryString, function (err, result, fields) {
	    if (err){
	    	console.error(err);
	    	throw err;	    
	    }	     
	    if(result.length>0){
			    console.log(result);
			 res.json(result);
			 	  
	    }else{
	       	res.send('Sorry, we cannot find that!');
	    }	   
	  });
  	
		
});

app.post('/getHotelsByAddress', function(req, res){
	console.log("In /getHotelsByAddress handler");
	var cId=req.body.cId;
	var sId=req.body.sId;
	var cityId=req.body.cityId;
	
	console.log("cId", cId);
	console.log("sId", sId);
	console.log("cityId", cityId);
	
	var queryString="SELECT * from tbl_city_address_type where city_id="+cityId+" and address_type_id=1 and active='1'";
	console.log("Query..", queryString);
			
		db.query(queryString, function (err, result, fields) {
		if (err){
			console.error(err);
			throw err;	    
		}	     
		if(result.length>0){
			    console.log(result);
			   	   res.json(result);		    	 
		}else{
			res.json([]);
		}	   
		});
	
		
	
	});


module.exports = app;