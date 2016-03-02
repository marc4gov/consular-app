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
    TextField,
    Paper,
    Styles,
    List,
    ListItem
    } = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

const style = {
  height: 200,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

PhotoRecognition = React.createClass({

  getInitialState: function () {
    Meteor.subscribe("images");
    //Meteor.subscribe("applications");
    var json = JSON.parse(Session.get("photoRecognition"));
    var d,e = null;
    console.log("Parse: ", json);
    if (json.Errors) {
      e = json.Errors[0].ErrCode + ", " + json.Errors[0].Message;
    } else {
      d = json.images[0].transaction;
      d = JSON.stringify(d);
      var json2 = JSON.parse(d);
      e = json2.status + ", Subject: " + json2.subject + ", " + "Confidence: " + json2.confidence;
    }
   
    //var f = json2.subject
    //console.log(d);
    return {
      user: Meteor.user(),
      pr: e //Session.get("photoRecognition")
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


  render: function () {

      return (
      <AppCanvas>
        <img src={this.state.user.profile.photo}/>
        <Card>
        <CardHeader
          title={this.state.pr}
        />
        </Card>

      </AppCanvas>
      );
  }
});