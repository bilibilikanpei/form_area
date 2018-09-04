var express = require('express');

var User = require('../lib/user.js');
module.exports = router = express.Router();
router.post('/', function (req, res) {
    var user = new User(req.body);
    user.register().then(({ msg, done }) => {
        res.json({ msg, done });
    })
})