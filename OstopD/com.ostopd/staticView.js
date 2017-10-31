/*  Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP */ 

var express = require('express');
var view = express();
var path = require('path');

/*static content configuration*/
view.use(express.static(path.join(__dirname, 'com.ostopd')));
view.set('view', path.join(__dirname, 'view/'));


view.set('view engine', 'jsx');
view.engine('jsx', require('express-react-views').createEngine());

module.exports = view;
