Applications = new Mongo.Collection('applications');

Meteor.methods({
  '/applications/delete': function (appId) {
    Applications.remove(appId);

  },
  '/applications/setStatus': function (appId, statusUpdate) {
    Applications.update(appId, {$set: {status: statusUpdate}});
  }
});