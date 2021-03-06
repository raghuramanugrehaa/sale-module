var bunyan = require('bunyan');


var esStream = new Elasticsearch({
  indexPattern: '[logstash-]YYYY.MM.DD',
  type: 'logs',
  host: 'localhost:9200'
});
esStream.on('error', function (err) {
  console.log('Elasticsearch Stream Error:', err.stack);
  if(!err){
	  console.log("connected to elastic logs");
  }
});



var log = bunyan.createLogger({
  name:'ACT-logs',
  streams:[
    { stream: process.stdout },
    { stream: esStream }
  ],
  serializers: bunyan.stdSerializers
});
exports.logs = function(){
  return log ;
};
