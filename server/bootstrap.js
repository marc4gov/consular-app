
Meteor.startup(function () {

/*
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Authorized-Engine');
  return next();
});
*/
    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'api',          // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
      certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
    });

    // Add the collection Players to the API "/players" path
    collectionApi.addCollection(Applications, 'applications', {
      // All values listed below are default
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['POST','GET','PUT','DELETE'],  // Allow creating, reading, updating, and deleting
      before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection. If the function returns false the action will be canceled, if you return true the action will take place.
        POST: undefined,  // function(obj) {return true/false;},
        GET: undefined,  // function(collectionID, objs) {return true/false;},
        PUT: undefined,  //function(collectionID, obj, newValues) {return true/false;},
        DELETE: undefined,  //function(collectionID, obj) {return true/false;}
      }
    });

        // Add the collection Msgs to the API "/msgs path
    collectionApi.addCollection(Msgs, 'msgs', {
      // All values listed below are default
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['POST','GET','PUT','DELETE'],  // Allow creating, reading, updating, and deleting
      before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection. If the function returns false the action will be canceled, if you return true the action will take place.
        POST: undefined,  // function(obj) {return true/false;},
        GET: undefined,  // function(collectionID, objs) {return true/false;},
        PUT: undefined,  //function(collectionID, obj, newValues) {return true/false;},
        DELETE: undefined,  //function(collectionID, obj) {return true/false;}
      }
    });

    // Starts the API server
    collectionApi.start();
  



    Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('google-cloud-service-key.pem');
  
    Slingshot.createDirective("pocdcv-files", Slingshot.GoogleCloud, {
      bucket: "pocdcv",
      acl: "public-read",
      allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
      maxSize: 10 * 1024 * 1024, // 10 MB (use null for unlimited)
      GoogleAccessId: 'pocdcv@api-project-665896965081.iam.gserviceaccount.com',
      authorize: function (file, metaContext) {
        //var pocfiles = PoCFiles.findOne(metaContext.pocfileId);
        //Denied if album doesn't exist or if it is not owned by the current user.
        return true;
      },
      key: function (file, metaContext) {
        return metaContext.pocfileId + "/" + Date.now() + "-" + file.name;
      }
    });



});
