var request = require('request');
var express = require('express');
var router = express.Router();
var log=require ('../../logs/payment_logs').logs();
var config = require('config');
var header=require('../../utils/utils');

// gets the list of all the invoice that are having status opened of a company

router.get('/:companyId/customerPayments', function(req, res) {

    var companyId = req.params.companyId;
    log.info("Request received for retrieve all customerPayments records with companyId: "+companyId);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/sale/CustomerPayment?format=json"
    }
    log.info("Request dispatched to MYOB for retrieve all customerPayments records with request method: GET, url: "+options.url+ " and body: "+ null);

    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        log.info("Response received from MYOB for retrieve all customerPayments records with statusCode: "+response.statusCode+ " and body: "+ body);
        if (!error && response.statusCode == 200) {
            log.debug("success response received from MYOB");
            res.status(response.statusCode).send(body);
        } else {
            log.error("failure response received from MYOB");
            res.status(response.statusCode).send(body);
        }
        log.info("Response dispatched for retrieve all customerPayments records with companyId: "+companyId + ", statusCode: "+ response.statusCode + " and response: "+ body);
    });
})

//gets total details of a invoice
router.get('/:companyId/customerPayments/:id', function(req, res) {
    var companyId = req.params.companyId;
    var id = req.params.id;
    var options = { headers: header,
     url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
            log.info({response:body},response.statusCode);
        } else {
            res.status(response.statusCode).send(body);
            log.error({respose:body},response.statusCode);
        }
    });
})

router.post('/:companyId/customerPayments', function(req, res) {
    var companyId = req.params.companyId;
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/CustomerPayment?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            log.info({response:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyId/customerPayments/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    console.log("Request param id: "+id);
    var options = { headers:header,
       url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            log.info({response:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
