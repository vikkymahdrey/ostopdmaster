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
									    	     	var fileUpload = require('express-fileupload');
									    	     

//for parsing multipart/form-data
app.use(upload.array());

//default options
app.use(fileUpload());

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
			   		
			   		
			   		/*set session attribute*/
			   		var sess=req.session;
			   			sess.usr=result[0].id;
			   			sess.role=result[0].roleId;
			   			console.log("idd1111",sess.usr);
			   			//console.log("responseeee",req.cookies.id);
			  
			   		//res.cookie('id', id, { maxAge: 900000, httpOnly: true });
			   			//console.log("responseeee",req.cookies.id);
			   				//res.cookie(name, 'value', {maxAge: 360000});   		
			   	  				// var data=JSON.stringify(result);
			   						//var data=JSON.parse(data);
			   							//console.log("id encoded"+new Buffer('JavaScript').toString('base64'));
					    	//console.log(Buffer.from(id, 'base64').toString());
					    	//console.error("encode",new Buffer('SmF2YVNjcmlwdA==', 'base64'));
			    	res.json(base64.encode(result[0].id));
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
			
			//res.clearCookie('id');
	
	
	var id=base64.decode(req.params.id);
	s.u=id;
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


app.get('/getUserById', function (req, res) {
	console.log("In /getUserById handler" );
	var s=req.session;
	var	id=s.he;
		console.log("In /getUserById id",req.session.he );
		var	queryString="SELECT * FROM tbl_user_info where id='"+id+"'";
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

app.get('/getData', function (req, res) {
	console.log("In /getData handler" );
	//var sess=req.session;
	//var	id=sess.userId;
	
	var id="1";
		console.log("In /getUserById id",req.session.he );
		var	queryString="SELECT * FROM tbl_user_info where id='"+id+"'";
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
	console.log("In /getRestaurants session",req.session.userId );
	
  	res.sendFile(app.get('view') + "Restaurants.html" );
		console.log("URL :",req.path);
});

app.get('/getHotels', function (req, res) {
	console.log("In /getHotels handler" );
	console.log("In /getHotels session",req.session.userId );
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
	var id=req.session.userId;
	console.log("user session",id);
	
	id="1";
	  var cId=req.body.cId;
		  var sId=req.body.sId;
				var cityId=req.body.cityId;
					var pin=req.body.pin;
						var aId=req.body.aId;
							var img=req.body.img;
											
						console.log("cId",cId);
						console.log("sId",sId);
						console.log("cityId",cityId);
						console.log("pin",pin);
						console.log("aId",aId);
						console.log("img",img);
		//var queryString="UPDATE tbl_user_addresstype SET city_id="+cityId+",user_id="+id+",address_type="+aId;
		var queryString="insert into tbl_user_addresstype (address_type,city_id,user_id,approval_status) values("+aId+","+cityId+","+id+",'pending')";
		console.log("Query..", queryString);
						
				db.query(queryString, function (err, result, fields) {
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
						
	
	});

app.post('/getHotelsByAddress', function(req, res){
	console.log("In /getHotelsByAddress handler");
	var id=req.session.userId;
	console.log("user session",id);
	  res.json('Coming soon!');		    	 
			
	
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

app.post('/getRestaurantsByCityId', function (req, res) {
	 console.log("In /getHotelsByCityId handler" );
	 var cityId=req.body.cityId;
	 
	 console.log("In cityId",cityId);
		var	queryString="SELECT * FROM tbl_city_address_type where city_id="+cityId+" and address_type_id=2";
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