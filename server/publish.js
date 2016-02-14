Meteor.publish('applications', function(appId) {
  check(appId, String);
  return Applications.find({appId: appId});
});

var querystring = Meteor.npmRequire('querystring');
var Future = Meteor.npmRequire("fibers/future");
//var request = Meteor.npmRequire('request');
//var http = Meteor.npmRequire('http');


Meteor.methods({
  '/applications/delete': function (appId) {
    Applications.remove(appId);

  },
  '/applications/setStatus': function (appId, statusUpdate) {
    Applications.update(appId, {$set: {status: statusUpdate}});
  },
  
  'requestPay': function () {
  	var f = new Future();
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
  			return f.return(result);
  		} else {

  			return f.throw(error);
  		}
	});
	return f.wait();

	},

	'requestPaymentStatus': function (resourcePath) {
	  	var f = new Future();
	  	console.log("resourcePath", resourcePath);
		//var path='/v1/checkouts';
		var data = querystring.stringify( {
			'authentication.userId' : '8a8294174b7ecb28014b9699220015cc',
			'authentication.password' : 'sy6KJsT8',
			'authentication.entityId' : '8a8294174b7ecb28014b9699220015ca'
		});
		var options = {
			port: 443,
			host: 'test.oppwa.com',
			path: resourcePath,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': data.length
			}
		};

		HTTP.call("GET", "https://test.oppwa.com/", {
			options: options,
			query: data,
		}, function(error, result) {
	  		if (!error) {
	  			//jsonRes = JSON.parse(result);
				//return callback(JSON.parse(result));
	  			return f.return(result);
	  		} else {

	  			return f.throw(error);
	  		}
		});
		return f.wait();
	},

        'userFeedToken': function() {

            return Stream.feedManager.getUserFeedToken('1');
        }
    
  
});
