var express = require('express');
var bodyParser= require('body-parser')
var router = express.Router();
require('../../models/user');

var mongoose = require('mongoose')
var User = mongoose.model('User')


module.exports.view = function(req, res){
    User.find(function(err, results) {
        if (err) {
            console.log(err)
        }

        if (!!results) {
            res.render('index.ejs', {quotes: results})
        }
    })
};


module.exports.save = function(req, res){
	var user = new User();
    user.name=req.body.name;
    user.quote=req.body.quote;
    user.save(function(err, results) {
        if (err) {
            console.log(err)
        }
		res.redirect('/user/view');
    })
};

module.exports.showSignIn = function(req, res){
	res.render('login.ejs', {})
};

module.exports.signIn = function(req, res){
	var user = new User();
    user.name=req.body.name;
    user.quote=req.body.quote;
    console.log(req.body);
	User.findOne({name: req.body.name},function(err, user) {
		console.log('=========================');
		console.log(user);
        if (err) {
            console.log(err)
        }

        if (!!user) {
        	req.session.username = req.body.name;
            res.redirect('/user/view');
        }else{
        	return res.redirect('/user/login')
        }
    });
};

module.exports.signOut = function(req, res){
	delete req.session.username;
	return res.redirect('/user/login')
};