var request = require('request');
var express = require('express');
var router = express.Router();
var async = require("async");
var config = require('config');
var header=require('../../utils/utils');
var accounts = {
    details: []
};
var customer = {
   details: []
};
var  taxcodes= {
    details: []
};
router.get('/:companyId',function(req, res) {
  var companyId = req.params.companyId;
  // create request objects
  var requests = [
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/GeneralLedger/Account/$filter=Classification eq'Bank'?format=json"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Customer?format=json"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/GeneralLedger/TaxCode?format=json"
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
      console.log("checking"+err);
    } else {

      results[0].Items.map(function(item) {
         accounts.details.push({
              "Name" : item.Name,
              "UID"  : item.UID

          });
      });
      results[1].Items.map(function(item) {
         customer.details.push({
              "Name" : item.CompanyName,
              "UID"  : item.UID

          });
      });
      results[2].Items.map(function(item) {
        taxcodes.details.push({
              "Name" : item.Code,
              "UID"  : item.UID

          });
      });
      var response = '{"salesHeads":' +JSON.stringify(accounts.details) +',"stores":' +JSON.stringify(customer.details) +',"taxcodes":' +JSON.stringify(taxcodes.details) +'}';

//console.log(taxcodes.details);
      res.send(JSON.parse(response));
    }
  });

});

module.exports=router;
