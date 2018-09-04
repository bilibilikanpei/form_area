var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/***********************
 引入路由组件
 ***********************/
var login = require('./src/login');
var register = require('./src/register');

/***********************
 添加路由组件
 ***********************/
app.get('/login', function (req, res) {
    console.log("get", JSON.stringify(req.query));
    res.end(JSON.stringify(req.query));
})

app.use('/login', login);
app.use('/register', register);

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})