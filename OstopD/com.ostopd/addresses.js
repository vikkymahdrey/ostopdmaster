/*  Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var view = require('./staticView');
var db = require('./dbConfig/db');
var sessionConfig=require('./sessionConfig');

app.use(view);
app.use(sessionConfig);

//for parsing application/json
app.use(bodyParser.json()); 

app.get('/getPermAdd', function (req, res) {
	console.log("In /getPermAdd handler" );
	app.set('usrId', req.session.usr);
	res.sendFile(view.get('view') + "permAddress.html" );
		
});

app.get('/getAddressType', function (req, res) {
	console.log("In /getAddressType handler" );

		var	queryString="SELECT * FROM tbl_address_type";
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

app.get('/getCountry', function (req, res) {
	console.log("In /getCountry handler" );
	var	queryString="SELECT * FROM tbl_country";
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

app.post('/getStateByCountryId', function (req, res) {
	console.log("In /getStateByCountryId handler");
	var id=req.body.cId;
	console.log("In /getStateByCountryId ID",id);
		var queryString="SELECT s.id,s.state_name FROM tbl_state as s join tbl_country as c on s.country_id=c.id where c.id="+id;
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



app.post('/getCityByStateId', function (req, res) {
	console.log("In /getStateByCountryId handler");
	var id=req.body.sId;
		var queryString="SELECT c.id,c.city_name,c.pincode FROM tbl_city as c join tbl_state as s on c.state_id=s.id where s.id="+id;
			console.log("Query..", queryString);
			
	db.query(queryString, function (err, result, fields) {
	    if(err){
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


app.post('/saveAddresses', function(req, res){
	console.log("In /saveAddresses handler");
	var id=app.get('usrId');
	
	console.log("/saveAddresses get user session",id);
	
	     var cId=req.body.cId;
		    var sId=req.body.sId;
				var cityId=req.body.cityId;
					var aId=req.body.aId;
												
						console.log("cId",cId);
						console.log("sId",sId);
						console.log("cityId",cityId);
						console.log("aId",aId);
						
		var queryString="select * from tbl_user_addresstype where city_id="+cityId+" and user_id="+id+" and address_type="+aId;
		var queryString1="insert into tbl_user_addresstype (address_type,city_id,user_id,approval_status) values("+aId+","+cityId+","+id+",'pending')";
		console.log("Query..", queryString);
						
			db.query(queryString, function (err, result, fields){
			    if(err){
			    	console.error(err);
			    	throw err;	    
			    }	
			    console.log("resultant result",result);
			    if(result.length>0){
					     res.json('Address already exist!');		    	 
			    }else{			    	
			    	db.query(queryString1, function (err, result, fields){
					    if (err){
					    	console.error(err);
					    	throw err;	    
					    }	
					    console.log("update result",result.affectedRows);
					    if(result.affectedRows===1){
							     res.json('Address updated successully!');		    	 
					    }else{
					        res.json('Address updation failed!');
					    }	   
					  });
			    }	   
			  });
		
						
						
	
	});


module.exports = app;

