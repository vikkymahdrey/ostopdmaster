/*   Document   : NodeJS / Express web server

    Created on : 29th Sept 2017, 13:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var app = express();
var path = require('path');

//var multer = require('multer');
//var upload = multer();
//var base64=require('base-64');
//var buffer=require('buffer');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var fileUpload = require('express-fileupload');


var ostopd = require('./com.ostopd/login');
var admin = require('./com.ostopd/admin');
var addresses = require('./com.ostopd/addresses');
var hotels = require('./com.ostopd/hotels');
var restaurants = require('./com.ostopd/restaurants');
var profile = require('./com.ostopd/profile');
var home = require('./com.ostopd/home');

app.use('/',ostopd);
app.use(home);	
app.use(admin);		
app.use(addresses);	
app.use(hotels);
app.use(restaurants);
app.use(profile);
									    	     

//for parsing multipart/form-data
//app.use(upload.array());

//default options
//app.use(fileUpload());

//for parsing application/json
//app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'com.ostopd')));
app.set('view', path.join(__dirname, 'com.ostopd/view/'));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



var server = app.listen(8070, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});