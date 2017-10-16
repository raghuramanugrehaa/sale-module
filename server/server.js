var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var customerPayment = require ('../api/customer-payment/payment');
var service = require ('../api/sale-invoice-service/servicetype');
var dependencies=require ('../api/dependencies/ACT-retrieve');
var cors=require('cors');
var app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/media',customerPayment);
app.use('/sales',service);
app.use('/sales/dependencies',dependencies);
app.use(function(req, res, next){
    var err = new Error ('Not Found');
    err.status = 404;
    next(err);
});


module.exports=app;
