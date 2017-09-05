var request = require('request');
var express = require('express');
var config = require('config');
var router = express.Router();
var header=require('../../utils/utils');
// Retrieve all invoices for a given company
router.get('/:companyid/invoices', function(req, res) {

    var companyid = req.params.companyid;
    var options = { headers: header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/Invoice/Service?format=json"
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

//Retrieve a Invoice for a given company
router.get('/:companyid/invoices/:id', function(req, res) {
    var companyid = req.params.companyid;
    var id = req.params.id;
    var options = { headers: header,
     url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/Invoice/Service/"+id+"?format=json"
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

// Create a Invoice
router.post('/:companyid/invoices',function(req, res) {
    var companyid = req.params.companyid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/Invoice/Service?format=json",
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

router.put('/:companyid/invoices/:id', function(req, res) {
    var id = req.params.id;
    var companyid = req.params.companyid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/Invoice/Service/"+id+"/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyid/invoices/:id', function(req, res) {
    var id = req.params.id;
    var companyid = req.params.companyid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Sale/Invoice/Service/"+id+"/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
