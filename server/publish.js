Meteor.publish('applications', function(appId) {
  check(appId, String);
  return Applications.find({appId: appId});
});
