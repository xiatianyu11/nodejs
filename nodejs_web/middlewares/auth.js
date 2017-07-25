var express = require('express');
var router = express.Router();
var url = require('url');

var whiteAPI = ['/health', '/user/login', 'user/logout'];
module.exports = function(req, res, next){

	var session = req.session;
	var route = url.parse(req.url).pathname;
	if(whiteAPI.indexOf(route) !== -1){
		next();
		return;
	}
	var username = session.username;

	if(!!!username){
		return res.redirect('/user/login');
		return;
	}
	console.log('auth');
	next();
	return;
};