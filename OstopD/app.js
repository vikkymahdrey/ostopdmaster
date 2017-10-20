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

//app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use (
		   session ({
		      secret: "atapp",
		      saveUninitialized: true,
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
	console.log("URL :",req.path);
	var session=req.session;
	
	console.log("/redirected session:",session.msg);
	if(session.msg===undefined){
		res.sendFile( app.get('view') + "login.html" );
	}else{
		res.sendFile( app.get('view') + "invalid.html" );
	}
		
						
});


app.get('/ostopD1', function (req, res) {
	console.log("/ostopD session :",req.session.userId);
  	res.sendFile( app.get('view') + "home.html" );
		
});

app.get('/getAddressStatus', function (req, res) {
	console.log("/getAddressStatus handler");
	res.sendFile( app.get('view') + "viewAddress.html" );
		
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
app.get('/ostopd', function(req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
	app.set('usrId', req.session.usr);
  	res.sendFile( app.get('view') + "home.html" );
		
});


app.get('/adminView', function (req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
  	res.sendFile( app.get('view') + "adminView.html" );
		
});


app.get('/ostopdAdmin', function (req, res) {
	console.log("/ostopd user :",req.session.usr);
	console.log("/ostopd role :",req.session.role);
  	res.sendFile( app.get('view') + "admin.html" );
		
});

app.get('/login', function (req, res) {
	console.log("In /loginSubmit");
	var session=req.session;
	
	var uname=req.param('uname');
		//var pass=req.body.pass;
	var pass=req.param('pass');
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
			  session.usr=result[0].id;
			    session.role=result[0].roleId;
			    session.displayname=result[0].displayname;
			    if(result[0].roleId===1){
			    	res.redirect('/ostopd');
			    }else if(result[0].roleId===2){
			    	res.redirect('/adminView');
			    }	
			  
			    		/*Cookie Management
			    
			   			res.cookie('id', id, { maxAge: 900000, httpOnly: true });
			   			console.log("responseeee",req.cookies.id);
			   			res.cookie(name, 'value', {maxAge: 360000});   		
			   	  		var data=JSON.stringify(result);
			   			var data=JSON.parse(data);
			   			console.log("id encoded"+new Buffer('JavaScript').toString('base64'));
					    console.log(Buffer.from(id, 'base64').toString());
					    console.error("encode",new Buffer('SmF2YVNjcmlwdA==', 'base64'));
			    	    res.json(base64.encode(result[0].id));
			    	    res.end();*/
			    		 	   
			    	  //res.sendFile( app.get('view') + "login.html" );
	    }else{
	    	  session.msg='Invalid username/password';
	    	  res.redirect('/');
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
	var id=app.get('usrId');	
		console.log("In /getUserById id",id);
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
	console.log("In /getRestaurants session",req.session.usr );
	
  	res.sendFile(app.get('view') + "Restaurants.html" );
		console.log("URL :",req.path);
});

app.get('/getHotels', function (req, res) {
	console.log("In /getHotels handler" );
	console.log("In /getHotels session",req.session.usr );
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



app.post('/getRestaurantsByAddress', function(req, res){
	console.log("In /getHotelsByAddress handler");
	var cId=req.body.cId;
	var sId=req.body.sId;
	var cityId=req.body.cityId;
	
	console.log("cId", cId);
	console.log("sId", sId);
	console.log("cityId", cityId);
	
	var queryString="SELECT * from tbl_city_address_type where city_id="+cityId+" and address_type_id=2 and active='1'";
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