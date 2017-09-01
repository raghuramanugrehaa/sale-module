
var request = require('request');
var express = require('express');
var constants=require('../../constants/constants').con();
//var log=require ('../../logs/log').logs();
var router = express.Router();
var t =       require('tcomb-validation');
var schema =  require('../../api/sale-invoice-service/validator/schema');

var validate = require('express-jsonschema').validate;



router.post('/new/:cid',validate({body: schema.create_invoice_schema}),function(req, res) {
    var cid = req.params.cid;
  var requestBody = JSON.stringify(req.body);
  //console.log("Request body: "+requestBody);
    var options = { headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
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
module.exports=router;
