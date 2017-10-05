/*   Document   : NodeJS / Express web server

    Created on : 29th Sept 2017, 13:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
	var app = express();
	var db = require('./com.ostopd/dbConfig/db');
		var router = express.Router();
			var path = require('path');
				var bodyParser = require('body-parser');
					var multer = require('multer');
						var upload = multer();
							var mysql = require('mysql');
								var react = require('react');
									var base64=require('base-64');
										//var buffer=require('buffer');
											var cookieParser = require('cookie-parser');
									    	     var session = require('express-session');
									    	     

//for parsing multipart/form-data
app.use(upload.array());

//for parsing application/json
app.use(bodyParser.json()); 

app.use(cookieParser());

//Use the session middleware
/*app.use(session({ secret: 'atapp', cookie: { maxAge: 1000000000 }}));*/


app.use (
		   session ({
		      secret: "atapp",
		      saveUninitialized: false,
		      resave: true,
		      rolling: true,
		      cookie: {
		         expires: 2592000000
		      }
		   })
		);

app.use(express.static(path.join(__dirname, 'com.ostopd')));
app.set('view', path.join(__dirname, 'com.ostopd/view/'));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



app.get('/', function (req, res) {
  	res.sendFile( app.get('view') + "login.html" );
		console.log("URL :",req.path);
});

app.get('/ostopD', function (req, res) {
	console.log("/ostopD session :",req.session.userId);
  	res.sendFile( app.get('view') + "home.html" );
		
});

app.post('/login', function (req, res) {
	console.log("In /loginSubmit");
	var sess=req.session;
	//console.log("onSubmit url",req.param('uname'));
	var uname=req.body.uname;
		var pass=req.body.pass;
			var queryString="SELECT * FROM tbl_user_info where loginId='"+uname+"' and password='"+pass+"'"+" and active='"+1+"'";
			console.log("Query..", queryString);
			
	db.query(queryString, function (err, result, fields) {
	    if (err){
	    	console.error(err);
	    	throw err;	    
	    }	     
	    if(result.length>0){
			   console.log(result);
			   		var id=result[0].id;
			   		
			   		/*set session attribute*/
			   		sess.id = id;
			   			sess.role=result[0].roleId;
			   			
			  
			   		//res.cookie('id', id, { maxAge: 900000, httpOnly: true });
			   			//console.log("responseeee",req.cookies.id);
			   				//res.cookie(name, 'value', {maxAge: 360000});   		
			   	  				// var data=JSON.stringify(result);
			   						//var data=JSON.parse(data);
			   							//console.log("id encoded"+new Buffer('JavaScript').toString('base64'));
					    	//console.log(Buffer.from(id, 'base64').toString());
					    	//console.error("encode",new Buffer('SmF2YVNjcmlwdA==', 'base64'));
			    	res.json(base64.encode(id));
			    	res.end();
			 	    //res.redirect('/home/'+string);
			    	//res.sendFile( app.get('view') + "login.html" );
	    }else{
	    	res.json(0);
	    }	   
	  });
			
 });



app.get('/home/:id', function (req, res) {
	console.log("In /home/:id handler" );
		//console.log("Id param",req.param('id'));
			//console.log("Id param",req.body.id);
				//console.log("Id param",req.params.id);
	var s=req.session;
		
		//s.someAttribute = req.params.id;
				
			//console.log("cookies json",req.cookies.id);
			console.log("session role",s.role);
			//res.clearCookie('id');
	
	
	var id=base64.decode(req.params.id);
		var	queryString="SELECT * FROM tbl_user_info where id='"+id+"'";
	console.log("Query..", queryString);
	
	db.query(queryString, function (err, result, fields) {
	    if (err){
	    	console.error(err);
	    	throw err;	    
	    }	     
	    if(result.length>0){
			    console.log(result);
			    s.userId=result[0].id;
			   // var data=JSON.stringify(result);
			    //var data=JSON.parse(data);
			    //var id=result[0].id;
			    	//console.log("id encoded"+new Buffer('JavaScript').toString('base64'));
			    	//console.log(Buffer.from(id, 'base64').toString());
			    	//console.error("encode",new Buffer('SmF2YVNjcmlwdA==', 'base64'));
			    	//res.json(base64.encode(id));
			 	    res.redirect('/ostopD');
			    	//res.sendFile( app.get('view') + "home.html" );
			    //res.render('hi');
			    //req.session.message.info.push('Account created successfully');
	    }else{
	    	//alert("db not found entry!");
	    	res.send('Sorry, we cannot find that!');
	    }	   
	  });
  	
		
});


app.get('/getPermAdd', function (req, res) {
	console.log("In /getPermAdd handler" );
	console.log("getPermAdd session",req.session.userId);
  	res.sendFile(app.get('view') + "permAddress.html" );
		console.log("URL :",req.path);
});

app.get('/getProfile', function (req, res) {
	console.log("In /getProfile handler" );
  	res.sendFile(app.get('view') + "UserProfile.html" );
		console.log("URL :",req.path);
});


app.get('/getRestaurants', function (req, res) {
	console.log("In /getRestaurants handler" );
  	res.sendFile(app.get('view') + "Restaurants.html" );
		console.log("URL :",req.path);
});

app.get('/getHotels', function (req, res) {
	console.log("In /getHotels handler" );
  	res.sendFile(app.get('view') + "Hotels.html" );
		console.log("URL :",req.path);
});


app.post('/getStateByCountryId', function (req, res) {
	console.log("In /getStateByCountryId handler");
	var id=req.body.cId;
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



app.get('/logout', function(req, res){
	//res.clearCookie('foo');
	   req.session.destroy(function(){
	      console.log("user logged out.");
	   });
	   res.redirect('/');
	});

var server = app.listen(8070, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});