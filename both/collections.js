// collections.js
var imageStore = new FS.Store.GridFS("images", {
  //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
  maxTries: 5, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});

Applications = new Mongo.Collection("applications");
Msgs = new Mongo.Collection("msgs");
