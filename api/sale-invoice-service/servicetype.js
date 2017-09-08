var request = require('request');
var express = require('express');
var config = require('config');
var router = express.Router();
var log=require ('../../logs/sale_invoice_logs').logs();
var header=require('../../utils/utils');
// Retrieve all invoices for a given company
router.get('/:companyId/invoices', function(req, res) {

    var companyId = req.params.companyId;
    var options = { headers: header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/Invoice/Service?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            log.info({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);

        }
    });
})

//Retrieve a Invoice for a given company
router.get('/:companyId/invoices/:id', function(req, res) {
    var companyId = req.params.companyId;
    var id = req.params.id;
    var options = { headers: header,
     url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/Invoice/Service/"+id+"?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
          log.info({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
           log.error({respose:body},response.statusCode);
          //  console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

// Create a Invoice
router.post('/:companyId/invoices',function(req, res) {
    var companyId = req.params.companyId;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/Invoice/Service?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            res.status(response.statusCode).send(body);
            log.info({respose:body},response.statusCode);
      } else {
           log.error({respose:body},response.statusCode);
           res.status(response.statusCode).send(body);

        }
    });
})

router.put('/:companyId/invoices/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/Invoice/Service/"+id+"/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
          log.info({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            log.error({respose:body},response.statusCode);
            //console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyId/invoices/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/Invoice/Service/"+id+"/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            log.info({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            log.error({respose:body},response.statusCode);
            //console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
