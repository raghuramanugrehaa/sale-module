var request = require('request');
var express = require('express');
var router = express.Router();
var async = require("async");
var config = require('config');

router.get('/load/:cid',function(req, res) {
  var cid = req.params.cid;
  // create request objects
  var requests = [{
    url:config.get('myob.host') +"/AccountRight/"+cid+"/GeneralLedger/Account/",
    headers: {
        'Authorization': config.get('myob.header.accessToken'),
        'x-myobapi-version': config.get('myob.header.api-version')
      }
  }, {
    url:config.get('myob.host') +"/AccountRight/"+cid+"/Customer/",
    headers: {
        'Authorization': config.get('myob.header.accessToken'),
        'x-myobapi-version': config.get('myob.header.api-version')
      }
  },
  {
    url:config.get('myob.host') +"/AccountRight/"+cid+"/GeneralLedger/TaxCode",
    headers: {
        'Authorization': config.get('myob.header.accessToken'),
        'x-myobapi-version': config.get('myob.header.api-version')
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
      res.send(JSON.parse(response));
    }
  });

});

module.exports=router;
