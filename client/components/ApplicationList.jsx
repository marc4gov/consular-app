injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    RaisedButton,
    TextField,
    Styles,
    List,
    ListItem
    } = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

ApplicationList = React.createClass({

  mixins: [ReactMeteorData],
 
  // Loads items from the collection
  getMeteorData() {
    var currentUser = Meteor.user();
    Meteor.subscribe("images");

    var handle = Meteor.subscribe('applications', currentUser._id);
    var handle2 = Meteor.subscribe('msgs', currentUser._id);
    return {
      appsLoading: ! handle.ready() || ! handle2.ready(), // Use handle to show loading state
      application: Applications.findOne({applicant: currentUser._id}),
      //message: Msgs.findOne({applicant: currentUser._id}),
      messages: Msgs.find({applicant: currentUser._id}).fetch()
    };
  },

    getInitialState: function(){
      var currentUser = Meteor.user();
      var initial = { 
          "currentUser": currentUser,
          "fullName" : currentUser.profile.firstName + " " + currentUser.profile.surName
      };

      return initial;
    },
    //general lifecycle methods
    componentWillMount: function(){

    },
    componentDidMount: function(){

    },
    getAge: function(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        age--;
      }
      return age;
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



    submitApp: function(){

      var contact = new Object();
      var convert = this.convertImgToBase64;
      var passportscan = this.state.currentUser.profile.passportscan;
      contact.fullName = this.state.currentUser.profile.firstName + " " + this.state.currentUser.profile.surName;
      contact.countryOfBirth = this.state.currentUser.profile.countryOfBirth;
      contact.nationality = this.state.currentUser.profile.nationality;
      contact.dateOfBirth = this.data.application.dateOfBirth;
      contact.passportNumber = this.data.application.passportNumber;
      contact.travelPurpose = this.data.application.travelPurpose;         
      contact.travelEU = this.data.application.travelEU;    
      contact.costOfStay = this.data.application.costOfStay;
      contact.location = this.data.application.location;
      contact.occupation = this.data.application.occupation;
      contact.period = this.data.application.period;
      contact.gender = this.data.application.gender;
      contact.userId = this.state.currentUser._id;
      contact.appId = this.data.application._id;
      contact.age = this.getAge(this.data.application.dateOfBirth);

      var applicationData = new Object();
      applicationData.name = contact.appId;
      applicationData.type1 = "Visa";
      applicationData.type = "create-product";
      applicationData.user = "aanvrager";
      applicationData.amount = "60";
      applicationData.size = "35";
      applicationData.color = "green";

      convert(this.state.currentUser.profile.photo, function(base64Img){
          contact.photofile = base64Img.replace("data:image/png;base64,", "");
          convert(passportscan, function(base64Img2){
                    contact.passportscan = base64Img2.replace("data:image/png;base64,", "");
                    Meteor.call("sendToBackend", contact);
                    Meteor.call("addToBlockchain", applicationData);
                    console.log("applicationData", applicationData);
                    toastr.success(contact.fullName, "Application submitted");
          });
      });

    },
    getComponent: function(){
        console.log("go Pay");
        FlowRouter.go('/pay');
    },
    renderMessages: function(){
      // 
      return this.data.messages.map((message) => {
        return <Message datetime={message.datetime} subject={message.subject} content={message.content} />;
      });
    },
    getApplicationDetails: function(){
      var d = this.data.application.dateOfBirth;
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear();
      var details = this.data.application.gender + " | " + datestring + " | " + this.data.application.travelPurpose + " | " + this.data.application.period;
      return details;
    },
    render: function(){

      if (this.data.appsLoading) {
        return <Loading />;
      }

      var details = this.getApplicationDetails();
    
      return (

        <AppCanvas>

          <Card>
            <CardHeader
            title="Application for Visa"
            subtitle={this.state.fullName}
            avatar={this.state.currentUser.profile.photo}
            />
            
            <CardTitle title={this.data.application.status} subtitle={details} />

            
            <MessageList messages={this.data.messages} />;

            <CardActions>
              <RaisedButton label="Pay" onClick={this.getComponent}  />
              <RaisedButton label="Submit Application" onClick={this.submitApp}  />
            </CardActions>
          </Card>

      </AppCanvas>

      );
    }
    
});