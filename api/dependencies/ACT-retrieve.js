
var request = require('request');
var express = require('express');
var constants=require('../../constants/constants').con();
//var log=require ('../../logs/log').logs();
var router = express.Router();
  var async = require("async");







router.get('/load',function(req, res) {





  // create request objects
  var requests = [{
    url: ' http://localhost:8080/AccountRight/21e9fddb-dce0-4582-a12c-07cf18b1a4ff//GeneralLedger/Account/',
    headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
    }
  }, {
    url: ' http://localhost:8080/AccountRight/21e9fddb-dce0-4582-a12c-07cf18b1a4ff/Customer/',
    headers: {
      'Authorization': constants.auth,
      'x-myobapi-version':constants.myobv
    }
  }];
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

      console.log(results);
      res.send(results);

    
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
