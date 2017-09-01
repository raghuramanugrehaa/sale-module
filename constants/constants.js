var myobip="13.126.47.35";
var myobport="8080";
var Authorization='Basic QWRtaW5pc3RyYXRvcjo=';
var myobversion="v2";


exports.con = function() {
  var myob_ip = myobip;
  var myob_port =myobport;
  var auth = Authorization;
  var myobv = myobversion;
  return {
      myob_ip: myob_ip,
      myob_port: myob_port,
      auth: auth,
      myobv: myobv


  };
};
