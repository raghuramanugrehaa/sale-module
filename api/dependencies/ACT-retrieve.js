
var request = require('request');
var express = require('express');
var constants=require('../../constants/constants').con();
//var log=require ('../../logs/log').logs();
var router = express.Router();
  var async = require("async");







router.get('/load/:cid',function(req, res) {


var cid = req.params.cid;


  // create request objects
  var requests = [{
    url:"http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/GeneralLedger/Account/",
    headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
    }
  }, {
    url:"http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/Customer/",
    headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
    }
  },
  {
    url:"http://"+constants.myob_ip+":"+constants.myob_port+"/AccountRight/"+cid+"/GeneralLedger/TaxCode",
    headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
    }
  }
];
  async.map(requests, function(obj, callback) {
    // iterator function
    request(obj, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // transform data here or pass it on
        var body = JSON.parse(body);
        callback(null, body);
      } else {
        callback(error || response.statusCode);
      }
    });
  }, function(err, results) {
    // all requests have been made
    if (err) {
      // handle your error
    } else {
      var response = '{"Account":' +JSON.stringify(results[0]) +',"customer":' +JSON.stringify(results[1]) +',"taxcode":' +JSON.stringify(results[2]) +'}';




      //console.log(results);
      res.send(JSON.parse(response));


    }
  });


});



module.exports=router;




























/*
  console.log("Request body: "+requestBody);
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
*/
