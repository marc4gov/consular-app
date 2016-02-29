// dropzone.js

Template.dropzone.events({
	'dropped #dropzone': function(event, temp) {
    	console.log('dropped a file');
    
    	FS.Utility.eachFile(event, function(file) {
       		Images.insert(file, function (err, fileObj) {
          		if (err){
             // handle error
          		} else {
             // handle success depending what you need to do
            		var userId = Meteor.userId();
            		var imagesURL = {
              			'profile.photo' : '/cfs/files/images/' + fileObj._id,
            		};
            		Meteor.users.update(userId, {$set: imagesURL});
          		}
        	});
   		});
	}
});

Template.imageView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});
