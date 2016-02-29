// FileUpload
FileUpload = React.createClass({
	uploadFile: function(event) {
		event.preventDefault();
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
	},
  	render() {
    	return (
      		<div>
          		Photo upload <input type="file" onChange={this.uploadFile}/>
      		</div>
    	);
  	}
});
