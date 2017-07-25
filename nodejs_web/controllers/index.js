var express = require('express');
var auth = require('../middlewares/auth');
var user = require('./user/user');
var fr = require('./fr');
var report = require('./report');
var router = express.Router();

router.use(auth);
router.get('/user/view', user.view);
router.post('/user/save', user.save);
router.get('/user/login', user.showSignIn);
router.post('/user/login', user.signIn);
router.get('/user/logout', user.signOut);

module.exports = router;