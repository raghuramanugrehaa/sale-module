
var request = require('request');
var express = require('express');
var config = require('config');
var constants=require('../../constants/constants').con();
var router = express.Router();
var t =       require('tcomb-validation');
var schema =  require('../../api/sale-invoice-service/validator/schema');

var validate = require('express-jsonschema').validate;

// Retrieve all invoices for a given company
router.get('/list/:cid', function(req, res) {
  var cid = req.params.cid;
    var options = { headers: {
        'Authorization': config.get('myob.accessToken'),
        'x-myobapi-version': config.get('myob.api-version')
    },
        url: config.get('myob.host') +"/AccountRight/"+cid+"/Sale/Invoice/Service?format=json"
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

//Retrieve a Invoice for a given company
router.get('/single/:cid/:id', function(req, res) {
    var cid = req.params.cid;
    var id = req.params.id;
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo=',
        'x-myobapi-version':'v2'
    },
     url: "http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/Sale/Invoice/Service/"+id+"?format=json"
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
router.post('/new/:cid',validate({body: schema.create_invoice_schema}),function(req, res) {
    var cid = req.params.cid;
  var requestBody = JSON.stringify(req.body);
  console.log("Request body: "+requestBody);
    var options = { headers: {
      'Authorization': constants.auth,
      'x-myobapi-version' :constants.myobv
    },
        url: "http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/Sale/Invoice/Service?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            //console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
              //log.info({respose:body},response.statusCode);
      } else {
          //  console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
              //log.error({respose:body},response.statusCode);
        }
    });
})

router.put('/update/:cid/:id', function(req, res) {
    var id = req.params.id;
    var cid = req.params.cid;
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo=',
        'x-myobapi-version':'v2'
    },
        url: "http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/Sale/Invoice/Service/"+id+"/?format=json",
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
