var {
    AppCanvas,
    AppBar,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    FlatButton,
    Styles,
    List,
    ListItem
    } = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

PhotoDetect = React.createClass({

  getInitialState: function () {
    Meteor.subscribe("images");
    //Meteor.subscribe("applications");
    return {
      user: Meteor.user(),
    };
  },
/*
  mixins: [ReactMeteorData],
  getMeteorData() {
    // This is the place to subscribe to any data you need
    //var streamData;
    
    Meteor.call('userFeedToken', function(err, token) {
        if(err) console.error(err);
        //Meteor.subscribe('Stream.feeds.user', 10, '1');
        console.log("Token=", token);
        /*
        var feed = Stream.feedManager.getUserFeed('1', token);

        var subscription = feed.subscribe(function callback(data) {
          console.log(data.new[0]);
          toastr.success(data.new[0].actor, data.new[0].verb);
                          }).then(null, this.failCallback);

        // All API calls are performed asynchronous and return a Promise object
        /*
        feed.get({limit:5})
        .then(function(data) { 
          streamData = data.results;
          toastr.success(data.results[0].actor, data.results[0].verb);
          console.log(streamData);
              return {
                strData: streamData
              };
        })
        .catch(function(reason) { console.log(reason)});
        
    });
    


  },
  */
    hitPhoto: function() {
        this.convertImgToBase64(this.state.user.profile.photo, function(base64Img){
          console.log('IMAGE:',base64Img);
          Meteor.call('requestPhotoDetect', base64Img, function(err, result) {
            console.log("result Detect: ", result);
          }); 
        });
   
    },

convertImgToBase64: function(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
},


  render: function () {

      return (
      <AppCanvas>
        <img src={this.state.user.profile.photo}/>
        <FlatButton
            label="Photo Detect"
            onClick={this.hitPhoto}/>

      </AppCanvas>
      );
  }
});