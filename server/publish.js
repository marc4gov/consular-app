Meteor.publish('applications', function(appId) {
  check(appId, String);
  return Applications.find({appId: appId});
});

var querystring = Meteor.npmRequire('querystring');
//var request = Meteor.npmRequire('request');
//var http = Meteor.npmRequire('http');

function reqPay(callback) {
	var path='/v1/checkouts';
	var data = querystring.stringify( {
		'authentication.userId' : '8a8294174b7ecb28014b9699220015cc',
		'authentication.password' : 'sy6KJsT8',
		'authentication.entityId' : '8a8294174b7ecb28014b9699220015ca',
		'amount' : '92.00',
		'currency' : 'EUR',
		'paymentType' : 'PA'
	});
	var options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	};

	HTTP.call("POST", "https://test.oppwa.com/v1/checkouts", {
		query: data
	}, function(error, result) {
  		if (!error) {
  			//jsonRes = JSON.parse(result);
			//return callback(JSON.parse(result));
  			return callback(result);
  		} else {

  			return callback(error);
  		}
	});	
/*
	var postRequest = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			//console.log(chunk);
			jsonRes = JSON.parse(chunk);
			return callback(jsonRes);
		});
	});
	postRequest.write(data);
	postRequest.end();
	*/
}

Meteor.methods({
  '/applications/delete': function (appId) {
    Applications.remove(appId);

  },
  '/applications/setStatus': function (appId, statusUpdate) {
    Applications.update(appId, {$set: {status: statusUpdate}});
  },
  
  'requestPay': function () {
		reqPay(function(responseData) {
			var jsonRes = JSON.parse(responseData.content); 
			console.log(jsonRes['id']);
			return jsonRes['id'];
		});
	}
  
});
