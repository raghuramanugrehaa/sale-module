var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var salesinvoice = require('./api/sales-invoice/invoice');
var customerpayment = require ('./api/customer-payment/payment');
var service = require ('./api/sale-invoice-service/servicetype');
var dependencies=require ('./api/dependencies/ACT-retrieve');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/',salesinvoice);
app.use('/customerpayment',customerpayment);
app.use('/service',service);
app.use('/dependecies',dependencies);

app.use(function(err, req, res, next) {

    var responseData;

    if (err.name === 'JsonSchemaValidation') {
        // Log the error however you please
        console.log(err.message);
        // logs "express-jsonschema: Invalid data found"

        // Set a bad request http response status or whatever you want
        res.status(400);

        // Format the response body however you want
        responseData = {
           statusText: 'Bad Request',
           jsonSchemaValidation: true,
           validations: err.validations  // All of your validation information
        };

        // Take into account the content type if your app serves various content types
        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            // If this is an html request then you should probably have
            // some type of Bad Request html template to respond with
            res.render('badrequestTemplate', responseData);
        }
    } else {
        // pass error to next error middleware handler
        next(err);
    }
});
app.use(function(req, res, next){
var err = new Error ('Not Found');
err.status = 404;
next(err);
});


module.exports=app;
