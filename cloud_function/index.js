/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
const request = require('retry-request');
const fs = require('fs');
const pubSub = require('@google-cloud/pubsub');
const BigQuery = require('@google-cloud/bigquery');

var https = require('https');
var querystring = require('querystring');
var subscription = "projects/cloud-iot-testing-185623/subscriptions/iot_sub2";

exports.pubsubtoserver = (event, callback) => {
  	  const pubsubMessage = event.data;
      const pubsubContext = event.context; 
      var data = null;
      var payload = [];
      var publishTime = Math.round(new Date().getTime());
      var messageType = "state"; 
      var pubsubMessageJason = null;
      try {
        
      var pushMessage = {
       	  "message": {
       		"attributes": {
       		"key": "value"
       		},
    	    "data": "SGVsbG8gQ2xvdWQgUHViL1N1YiEgSGVyZSBpcyBteSBtZXNzYWdlIQ==",
    	    "message_id": "136969346945"
  		  },
  		  "subscription": "projects/myproject/subscriptions/mysubscription"
       }  
        
        
        //data = Buffer.from(pubsubMessage.data, 'base64').toString();
        
        
        pushMessage.message.attributes = pubsubMessage.attributes;
        pushMessage.message.data = pubsubMessage.data;
        pushMessage.message.message_id = pubsubContext.eventId;
        pushMessage.subscription = subscription;
        
        var jsonData = JSON.stringify(pushMessage);
        
        //delete pubsubMessage.attributes;
        //delete pubsubMessage["@type"];
             
        console.log("data: " + jsonData);                 
  
var pkey = '-----BEGIN RSA PRIVATE KEY-----\n\
MIIEowIBAAKCAQEAqIBbtcgHBUfGim840CxBNJYNdj/G56AAKmnSMQXTmtmQfCNl\n\
cUbVtnzIbL7i1KKqTyrS7xQbhBnrFfRba2zp0ggk0gKnyi0rzswBHCLjwxL78re+\n\
OngAVJS+9cIEnW0BBX3aw+/J2FxmQ45hsvljTkbAiNuDLAf140PWM5dYQwiTwc9z\n\
zpRFHHU7ECRDbCzdL8rCS/T5tDqOeGd3QiIHm/T60+RPYXzHCd0s71B15jFCCzrP\n\
em9NOdplEuXGdw40OKA9NZ760KIcLbZIP7bBkR9LhxXPKQ3Y7n4cFI9vIWVU0Za3\n\
A4x0vKNqtDNZ6pylA4TNL5N15T6J81pIiNCcFQIDAQABAoIBAEWBvVL9EjhRZUrR\n\
mmP0/WjNxPvUTx5Y1/im8jeaqbEksf8jMsNJbvr5+ksxaqw/9XT2u1A3wSn67wh9\n\
ZgCoSsOC7H1c7w3tGDcT3BlZIw7jE98JgITp32kEeskxoWm2/0bepZFRpreDVgPk\n\
BdUoHpi5gs5xjmhpWDrJTuC1O4laoqpDDRXsJ2vKsEabpVug8J3El+kKbAHMfvDw\n\
OzD62SJ8lhGwH7cvCzB9Eeu7IEWk+3/pEhfoFNCTOradW2ppG6I2NRiWnp4zBHgU\n\
JO3OGypnzdoxbmoGA8C801ym9RKLXshU/HdB/orT/DSYKnCIIesYqDwQ5IqoMPm1\n\
msidr8ECgYEA3keJnFDNmtyTCx0JuLLTa1S+fx5VdgCH4wr8kBZhtT/IzByHstVK\n\
A+8Um6WT8OqNs+euwwIOsm4mpheGl+vyWM5VTMQ5K8+n7WLqVKhbTdDVx8jdDCIa\n\
cwyICRgOBz7/i18I2OAo/+dWf37ebA+kGz/hJk0oV5w0rGNeVt0JxC0CgYEAwhBK\n\
z1tyVdt8e860FORIE0RbWu5rjfcAtfGoh5e5B3F2ebGQh35w+TyumR8JqI/wb+wp\n\
5/v29JlJKdZ/JpdWqaF2wIAikDaArpoUWKHDkfkdQGBsTu+ABeRhRMNmqpe3a71T\n\
9pryX3FyzmCkWZfm66YblKh98CKMHP2PdMP1IIkCgYEAnKvNqdkmYn4QQqgP/xhE\n\
foV30/+cexT6sqQ+yoyMCAXSUVPWrc06YzVz0BVQBmI8yM6HVrovg8KyCSXR32kW\n\
I1QjuX0hUukF0wOCaXNVD68fz7abX372J5twkwBaeu8DjcfJY5v0KhNz21+gBIit\n\
wesvliCSS9Y1JkDP8OfRh20CgYB7+4iv/Y6Ih9d6Cc9HYakilhN/fr88TcgodaHk\n\
LuzJcpXsnaLmzcNDmJ87uHalOIC2IL2NNo7KKnxxvFYzw5Bcg4mo5rQuSoPgCRRi\n\
o8acpfkoPfI0ZBL4sLXsBqK67n8C2EyiSs/6ZjKg42Fc1A12FAOe8B61ony9sMlM\n\
Ij2jcQKBgHtmBSH6rVi7FZ/plL54OBtIb0XYM5hWP09yQL1Z/p7Nfb0pCOzMn0VC\n\
t1KRwgMpWDh78rXN3a1sJLqyIjk6Uyqm5/n0by7/eMwTi4VaSDF8aI20q8kY3h1O\n\
9Oq7ofnaYI0caOvKNmptPKtnNKRwVRpt9erb8q4sQdxAUacwDH9O\n\
-----END RSA PRIVATE KEY-----';

       
var cert = '-----BEGIN CERTIFICATE-----\n\
MIIDTjCCAjYCCQCEhtewoJYi4DANBgkqhkiG9w0BAQsFADBpMQswCQYDVQQGEwJV\n\
UzETMBEGA1UECAwKQ2FsaWZvcm5pYTERMA8GA1UEBwwIU2FuIEpvc2UxITAfBgNV\n\
BAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEPMA0GA1UEAwwGdW51c2VkMB4X\n\
DTE4MDkyNjA4NTIzMloXDTE5MDkyNjA4NTIzMlowaTELMAkGA1UEBhMCVVMxEzAR\n\
BgNVBAgMCkNhbGlmb3JuaWExETAPBgNVBAcMCFNhbiBKb3NlMSEwHwYDVQQKDBhJ\n\
bnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxDzANBgNVBAMMBnVudXNlZDCCASIwDQYJ\n\
KoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiAW7XIBwVHxopvONAsQTSWDXY/xueg\n\
ACpp0jEF05rZkHwjZXFG1bZ8yGy+4tSiqk8q0u8UG4QZ6xX0W2ts6dIIJNICp8ot\n\
K87MARwi48MS+/K3vjp4AFSUvvXCBJ1tAQV92sPvydhcZkOOYbL5Y05GwIjbgywH\n\
9eND1jOXWEMIk8HPc86URRx1OxAkQ2ws3S/Kwkv0+bQ6jnhnd0IiB5v0+tPkT2F8\n\
xwndLO9QdeYxQgs6z3pvTTnaZRLlxncONDigPTWe+tCiHC22SD+2wZEfS4cVzykN\n\
2O5+HBSPbyFlVNGWtwOMdLyjarQzWeqcpQOEzS+TdeU+ifNaSIjQnBUCAwEAATAN\n\
BgkqhkiG9w0BAQsFAAOCAQEAbahDX8OLfNUlr00/cKrN4kFQR+9iRCjZffHf8mhS\n\
Z56JcaaeUABbunFsc7wRsmProLhETrq5N01KWKP/gvA++NBs75DvzXcIcXY4Ejvq\n\
r/CHUYDBgPMuBdFGqMOzgbCqGZn6Sn4Qw4shQBcU+w9pPC7CIH0S9H5VRRSa6jbR\n\
GeVcel7Vj4ptXkJufTGsiOArr8FGXuWQyseO23/BE6fKH13B6R4ArOZBCiQxlN/L\n\
DGtMQqB82dk3YTOXgB8HvwfGVmPH8Q5O20GaIdqAYqXIo9utnLqDEogUypWvNUJg\n\
AAxkl+c1uM2rqjfuHHtIXipbp3pwCUyw/6nnKyI5j5A42g==\n\
-----END CERTIFICATE-----';
        
var ca = '-----BEGIN CERTIFICATE-----\n\
MIIDqDCCApCgAwIBAgIJAK1Z8uhd6t2OMA0GCSqGSIb3DQEBCwUAMGkxCzAJBgNV\n\
BAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMREwDwYDVQQHDAhTYW4gSm9zZTEh\n\
MB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMQ8wDQYDVQQDDAZ1bnVz\n\
ZWQwHhcNMTgwOTI4MDAyMDA1WhcNMjEwNzE4MDAyMDA1WjBpMQswCQYDVQQGEwJV\n\
UzETMBEGA1UECAwKQ2FsaWZvcm5pYTERMA8GA1UEBwwIU2FuIEpvc2UxITAfBgNV\n\
BAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEPMA0GA1UEAwwGdW51c2VkMIIB\n\
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqIBbtcgHBUfGim840CxBNJYN\n\
dj/G56AAKmnSMQXTmtmQfCNlcUbVtnzIbL7i1KKqTyrS7xQbhBnrFfRba2zp0ggk\n\
0gKnyi0rzswBHCLjwxL78re+OngAVJS+9cIEnW0BBX3aw+/J2FxmQ45hsvljTkbA\n\
iNuDLAf140PWM5dYQwiTwc9zzpRFHHU7ECRDbCzdL8rCS/T5tDqOeGd3QiIHm/T6\n\
0+RPYXzHCd0s71B15jFCCzrPem9NOdplEuXGdw40OKA9NZ760KIcLbZIP7bBkR9L\n\
hxXPKQ3Y7n4cFI9vIWVU0Za3A4x0vKNqtDNZ6pylA4TNL5N15T6J81pIiNCcFQID\n\
AQABo1MwUTAdBgNVHQ4EFgQUk0vR1wNHPvSc3BqjhgZixaccCckwHwYDVR0jBBgw\n\
FoAUk0vR1wNHPvSc3BqjhgZixaccCckwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG\n\
9w0BAQsFAAOCAQEATM5yRsuxZ+q+GSnwCPoZ2D1oXl5w8VuBxE0uznFgoE0yBM6S\n\
CUjCTf5+IIMqGGsRPkJL3gZySKSSBZzUBiDf26AX1XHxkPWCpURxGXRR1c0sgBp7\n\
8fWhI+9uvo6E83X9jz+K9TjMDODRs5TPAqWkH1480++w5MBj96J3vxKNh3CI9PNO\n\
dFvbRmwigTnh9q1HcEcp9GEalYQcKWWnz2O6zuSvGxczhfGlr18H4EAPdJSLqxol\n\
G7jr7uoPhXpaONeZIWyCLdmAB1i3wOVNRdm6wyzmuZRTCrOBzLCdHb62tVDS5GMy\n\
a0nvBMKtJ1XSmI9IC1AJxjrAzDfRsWhzx7ZObQ==\n\
-----END CERTIFICATE-----';

/* 
var cert = '-----BEGIN CERTIFICATE-----\n\
MIIDYDCCAkigAwIBAgIJAOYQl3rPVOA+MA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\n\
BAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX\n\
aWRnaXRzIFB0eSBMdGQwHhcNMTgwOTEzMTYxMjU4WhcNMTgxMDEzMTYxMjU4WjBF\n\
MQswCQYDVQQGEwJVUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50\n\
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\n\
CgKCAQEA3Aa/NOqleP2DuGRn2olX2dakoUoSxDZuZ+i+ouKvKOjF/Lt+AjijfZX6\n\
nKc6tdUZR+CHOaBkJr82J40i5ib/NzM9ZHNf2TZDqgz1aF+kr/exr4oejKpkwjBe\n\
D60X034/3Llw2yGHBZYSrTkePmwv0RR1sRBa1iSXuCxtroPPUlj+NgYI5pgEpKxt\n\
WiA9ydgBsi2BduCuHciQug+171+iBfiH5lmgQ2wkKo7w5wEY3UpnueDlh6Y06cBr\n\
Op5RpZ986Ofpu/iUu0DULtNq0Z8XyheGmwNM81kyFYnRZDfxcDXCjGZR5fJblPLh\n\
IiKi4wdMwP32ag5d3C1LfZsEpX+1QQIDAQABo1MwUTAdBgNVHQ4EFgQUv6j20r5M\n\
Acjf+DWgr3fgLgTX/eUwHwYDVR0jBBgwFoAUv6j20r5MAcjf+DWgr3fgLgTX/eUw\n\
DwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAV3YGT0YMU6kaPbeX\n\
G0Jt1lrXpat/gpKNhwPgqDCu/t7UN2xH8d05XZghn+cuVqw7t94OUjIImlytV0Rm\n\
q6ycVgwIyPFE/ybKnSBzZ9OmWDQ/qtaY6mHVa7xx4rfWCVUOMrYJYYAq/hxbCoTF\n\
kh7CpRQkVsnTHv745/s0si4lz5kkDjQQ/mgI8tis9yvkgErckSSb5D/C2tbpsAOh\n\
/AN1ZQAObw8hpOTOgOTEcuf4/6FVLIM3mfiiCpAfT/2BYfShnTlObBytyvIJdq3O\n\
c85nI535UiLbjunYD5emlDqFUCZRev51pb2M/rExjJmvmrxRqZIBinSEfXDQzQQy\n\
wsATbg==\n\
-----END CERTIFICATE-----';
*/

        
var options = {
  host: '35.192.227.193',
  port: 443,
  method: 'POST',
  path: '/write',
  key: pkey,
  cert: cert,
  ca:ca,
  rejectUnauthorized: false,
  //requestCert: true,
  agent: false,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': jsonData.length
  }
};
 
// request object
var req = https.request(options, function (res) {
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
  });
  res.on('end', function () {
    console.log(result);
  });
  res.on('error', function (err) {
    console.log(err);
  })
});
 
// req error
req.on('error', function (err) {
  console.log(err);
});
 
//send request witht the postData form
req.write(jsonData);
req.end();

   
      } catch (err) {
        console.error(err);
        throw new Error(
          `"Invalid Data.`
        );
      }
     
};
