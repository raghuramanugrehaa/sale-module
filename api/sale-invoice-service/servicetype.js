var request = require('request');
var express = require('express');
var config = require('config');
var router = express.Router();
var head=require('../../utils/utils');
// Retrieve all invoices for a given company
router.get('/:cid', function(req, res) {
    var cid = req.params.cid;
    var options = { headers: head,
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service?format=json"
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
router.get('/:cid/invoices/:id', function(req, res) {
    var cid = req.params.cid;
    var id = req.params.id;
    var options = { headers: head,
     url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service/"+id+"?format=json"
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
router.post('/:cid/invoices',function(req, res) {
    var cid = req.params.cid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:head,
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service?format=json",
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

router.put('/:cid/invoices/:id', function(req, res) {
    var id = req.params.id;
    var cid = req.params.cid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:head,
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service/"+id+"/?format=json",
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

router.delete('/:cid/invoices/:id', function(req, res) {
    var id = req.params.id;
    var cid = req.params.cid;
    var requestBody = JSON.stringify(req.body);
    var options = { headers:head,
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service/"+id+"/?format=json",
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
