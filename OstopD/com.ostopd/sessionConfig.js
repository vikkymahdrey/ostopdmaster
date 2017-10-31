/*  Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var session = require('express-session');

/*Session settings configuration*/
module.exports = session ({
    secret: "atapp",
    saveUninitialized: true,
    resave: true,
    rolling: true,
    cookie: {
       expires: 25920000000,
       secure: !true
    }
 });

//Use the session middleware
//app.use(session({ secret: 'atapp', cookie: { maxAge: 1000000000 }}));
//app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));