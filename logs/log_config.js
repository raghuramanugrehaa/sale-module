var bunyan = require('bunyan');
var Elasticsearch = require('bunyan-elasticsearch');
var esStream = new Elasticsearch({
  indexPattern: '[logs-]YYYY.MM.DD',
  type: 'logs',
  host: 'localhost:9200'
});
esStream.on('error', function (err) {
  console.log('Elasticsearch Stream Error:', err.stack);
});
 
var logger = bunyan.createLogger({
  name: "My Application",
  streams: [
    { stream: process.stdout },
    { stream: esStream }
  ],
  serializers: bunyan.stdSerializers
});
 

exports.logs = function(){
  return logger ;
};
