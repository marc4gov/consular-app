Meteor.publish('applications', function() {
  //check(appId, String);
  return Applications.find();
});

Meteor.publish('images', function(){ return Images.find(); });

Meteor.publish('imagesById', function(imageId) {
  return Images.find({_id: imageId});
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

  "userExists": function(username){
          return !!Meteor.users.findOne({username: username});
  },

'requestPhotoDetect': function (imageB64) {
  	var f = new Future();
  	var image1 = imageB64.replace("data:image/png;base64,", "");
	var options = {
		data: {
			"image": image1,
			"gallery_name": "PoCDCV",
			"threshold": 0.7
		},
		headers: {
			'Content-Type': 'application/json',
			'app_id': 'ad5b6690',
			'app_key': '005afee0fd7c340746266225be909bcb', 
		}
	};
	//console.log("Options:", options);

	HTTP.call("POST", "https://api.kairos.com/recognize", options, 
		function(error, result) {
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

    fetchFromService: function(appdata) {

      var url = "http://localhost:8080/engine-rest/process-definition/key/behandelenAlsCase/submit-form";
      //synchronous 
      var options = {
        headers: {'Content-Type': 'application/json'},
        data: {
        		"variables" :
                {
					"fullName" : {"value" : appdata.fullName, "type": "String"},
 					"birthDate" : {"value" : appdata.birthDate, "type": "Date"},
					"nationality" : {"value" : appdata.nationality, "type": "String"},
					"country" : {"value" : appdata.country, "type": "String"},
					"passportNumber": {"value" : appdata.passportNumber, "type": "Long"},
					"travelPurpose": {"value" : appdata.travelPurpose, "type": "String"},
					"age": {"value" : appdata.age, "type": "Long"},
					"status": {"value": "Open", "type":"String"},
					 "bevoegd" : {"value" : true, "type": "Boolean"}
 				},
 				"businessKey" : appdata.appId
        	}
      };

      var result = HTTP.post(url, options);
      
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        console.log("Response received.");
        return respJson;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }
    
  
});
