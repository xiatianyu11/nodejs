var express = require('express');
var bodyParser= require('body-parser')
var router = express.Router();
require('../models/user');

var mongoose = require('mongoose')
var User = mongoose.model('User')


module.exports.view = function(req, res){
    User.find(function(err, results) {
        if (err) {
            console.log(err)
        }

        if (!!results) {
            res.render('index.ejs', {users: results})
        }
    })
};


module.exports.save = function(req, res){
	var user = new User();
    user.username=req.body.username;
    user.password=req.body.password;
    user.save(function(err, results) {
        if (err) {
            console.log(err)
        }
		res.redirect('/user/view');
    })
};

module.exports.del = function(req, res){
    console.log(req.params);
    User.remove({username: req.params.username}, function(err) {
        if (!err) {
                console.log(err);
        }
        res.redirect('/user/view');
    });
};

module.exports.showSignIn = function(req, res){
	res.render('login.ejs', {})
};

module.exports.signIn = function(req, res){
	var user = new User();
    user.username=req.body.username;
    user.password=req.body.password;
    console.log(req.body);
	User.findOne({username: req.body.username},function(err, user) {
        if (err) {
            console.log(err)
        }

        if (!!!user) {
            return res.redirect('/user/login')
        }

        user.comparePassword(req.body.password,function(err, isMatch) {
            if (err) {
                console.log(err)
            }
            if (isMatch) {
                req.session.username = user.username;
                res.redirect('/user/view');
            }
            else {
                return res.redirect('/user/login')
            }
        });
    });
};

module.exports.signOut = function(req, res){
	delete req.session.username;
	return res.redirect('/user/login')
};