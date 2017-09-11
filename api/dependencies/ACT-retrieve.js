var request = require('request');
var express = require('express');
var router = express.Router();
var log=require ('../../logs/Act-retreivelogs').logs();
var async = require("async");
var config = require('config');
var header=require('../../utils/utils');
var accounts = {
    details: []
};
var customer = {
   details: []
};//sales filter active  //  and also active //wiki page // //procedure

router.get('/:companyId',function(req, res) {
  var companyId = req.params.companyId;
  // create request objects
  console.log(config.get('myob.host'));
  var requests = [
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/GeneralLedger/Account/$filter=Classification eq'Income' and IsActive eq true?format=json"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Customer?format=json"
    }
];
  async.map(requests, function(obj, callback) {
    // iterator function
    request(obj, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // transform data here or pass it on
        var body = JSON.parse(body);
        callback(null, body);
        log.info(response.statusCode);
      } else {
        callback(error || response.statusCode);
        log.error({response:body},response.statusCode);
      }
    });
  }, function(err, results) {
    // all requests have been made
    if (err) {
      // handle your error
      //console.log(err);
      console.log("checking"+err);
    } else {
console.log(results);
      results[0].Items.map(function(item) {
         accounts.details.push({
              "Name" : item.Name,
              "UID"  : item.UID,
              "TaxCodeUID":item.TaxCode.UID

          });
      });
      results[1].Items.map(function(item) {
         customer.details.push({
              "Name" : item.CompanyName,
              "UID"  : item.UID

          });
      });

      var response = '{"salesHeads":' +JSON.stringify(accounts.details) +',"stores":' +JSON.stringify(customer.details)+'}';

//console.log(taxcodes.details);
      res.send(JSON.parse(response));
    }
  });

});

module.exports=router;
