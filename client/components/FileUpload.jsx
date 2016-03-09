// FileUpload

FileUpload = React.createClass({
  propTypes: {
    uploadtype: React.PropTypes.string.isRequired
  },
	uploadFile: function(event) {
		event.preventDefault();
    var uploadtype = this.props.uploadtype;
		FS.Utility.eachFile(event, function(file) {
       		Images.insert(file, function (err, fileObj) {
          		if (err){
             // handle error
          		} else {
             // handle success depending what you need to do
            		var userId = Meteor.userId();
                var profile = 'profile.' + uploadtype;
                console.log("profile: ", profile);
                var imagesURL = {};
                imagesURL[profile + ''] = '/cfs/files/images/' + fileObj._id;
            		/*
                var imagesURL = {
              			 profile : '/cfs/files/images/' + fileObj._id,
            		};
                */
            		Meteor.users.update(userId, {$set: imagesURL});
          		}
        	});
   		});
	},
  render() {
    return (
      <div>
          Upload {this.props.uploadtype} <input type="file" onChange={this.uploadFile} />
      </div>
    );
  }
});
