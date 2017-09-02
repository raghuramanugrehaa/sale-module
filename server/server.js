var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var customerpayment = require ('../api/customer-payment/payment');
var service = require ('../api/sale-invoice-service/servicetype');
var dependencies=require ('../api/dependencies/ACT-retrieve');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/customerpayment',customerpayment);
app.use('/service',service);
app.use('/dependecies',dependencies);
app.use(function(req, res, next){
    var err = new Error ('Not Found');
    err.status = 404;
    next(err);
});


module.exports=app;
