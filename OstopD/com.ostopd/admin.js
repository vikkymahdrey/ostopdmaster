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

app.get('/adminView', function (req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
  	res.sendFile( view.get('view') + "adminView.html" );
		
});


app.get('/ostopdAdmin', function (req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
  	res.sendFile( view.get('view') + "admin.html" );
		
});

app.get('/getAddressStatus', function (req, res) {
	console.log("/getAddressStatus handler");
	res.sendFile( view.get('view') + "viewAddress.html" );
		
});


app.get('/fetchViewAddress', function (req, res) {
	console.log("/getViewAddress handler");
	var usrId=req.session.usr;
	var role=req.session.role;
	
	var queryString="SELECT ua.id,u.displayname,co.country_name,s.state_name,c.city_name,approval_status,at.address_type FROM tbl_user_addresstype ua join tbl_city c on ua.city_id=c.id join tbl_state s on c.state_id=s.id join tbl_country co on s.country_id=co.id join tbl_user_info u on ua.user_id=u.id join tbl_address_type at on ua.address_type=at.id where approval_status='pending' ";
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
		res.json("Data not found!");
	}	
	});
	
});

module.exports = app;