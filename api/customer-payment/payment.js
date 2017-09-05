var request = require('request');
var express = require('express');
var router = express.Router();
var config = require('config');
var header=require('../../utils/utils');
// gets the list of all the invoice that are having status opened of a company

router.get('/:companyid/customerPayments', function(req, res) {
    var companyid = req.params.companyid;
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/sale/CustomerPayment?format=json"
    }

    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);

        }
    });
})

//gets total details of a invoice
router.get('/:companyid/customerPayments/:id', function(req, res) {
    var companyid = req.params.companyid;
    var id = req.params.id;
    var options = { headers: header,
     url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);

        } else {
            res.status(response.statusCode).send(body);

        }
    });
})

router.post('/:companyid/customerPayments', function(req, res) {
    var companyid = req.params.companyid;
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/CustomerPayment?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            res.status(response.statusCode).send(body);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyid/customerPayments/:id', function(req, res) {
    var id = req.params.id;
    var companyid = req.params.companyid;
    console.log("Request param id: "+id);
    var options = { headers:header,
       url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
           res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
