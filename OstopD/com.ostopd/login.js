var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var view = require('./staticView');
var db = require('./dbConfig/db');
var sessionConfig=require('./sessionConfig');

app.use(sessionConfig);


//for parsing application/json
app.use(bodyParser.json()); 



app.get('/', function (req, res){
		console.log(" '/' handler");
		console.log("session req",req.session);	
	var session=req.session;
		console.log("session msg",session.msg);	
	if(session.msg===undefined){
		res.sendFile( view.get('view') + "login.html" );
	}else{
		res.sendFile( view.get('view') + "invalid.html" );
	}
});


app.get('/login', function (req, res) {
	console.log("/login handler");
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


app.get('/logout', function(req, res){
	  req.session.destroy(function(){
	      console.log("user logged out.");
	   });
	   res.redirect('/');
	});





//export this app to use in our app.js
module.exports = app;