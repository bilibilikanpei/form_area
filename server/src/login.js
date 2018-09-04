var express = require('express');
var bcrypt = require('bcrypt');

var User = require('../lib/user.js');

const user = {
    id: 1,
    account: 920673805,
    nickName: '黎志贤',
    salt: '',
    pass: '0123456789'
}
//用户数据处理
bcrypt.genSalt(10, function (err, salt) {
    if (err) {
        return;
    }
    user.salt = salt;
    bcrypt.hash(user.pass, salt, function (err, hash) {
        user.pass = hash;
    })
})

module.exports = router = express.Router();

router.post('/', function (req, res) {
    res.cookie('user', `${req.body.account}`);
    var user = new User(req.body);
    user.authenticate().then(obj => {
        obj.cookie = req.cookies;
        res.json(obj);
    }).catch(obj => {
        res.json(obj);
    });
})