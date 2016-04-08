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
      if (this.data.application.appTypeName == "Schengen Visa" || this.data.application.appTypeName == "Caribbean Visa") {
        contact.occupation = this.data.application.occupation;
        contact.period = this.data.application.period;
        contact.travelPurpose = this.data.application.travelPurpose;         
        contact.travelEU = this.data.application.travelEU;    
        contact.costOfStay = this.data.application.costOfStay;
        contact.countryOfBirth = this.state.currentUser.profile.countryOfBirth;
        contact.nationality = this.state.currentUser.profile.nationality;
      }
      if (this.data.application.appTypeName  == "Travel document") {
        contact.maritalStatus = this.data.application.maritalStatus;
        contact.travelDoc = this.data.application.travelDoc;
        contact.bsnNumber = this.data.application.bsnNumber; 
      }
      if (this.data.application.appTypeName  == "Legalization") {
        contact.legalDoc = this.data.application.legalDoc;
      }
      contact.dateOfBirth = this.data.application.dateOfBirth;
      contact.passportNumber = this.data.application.passportNumber;
      contact.location = this.data.application.location;
      contact.gender = this.data.application.gender;
      contact.userId = this.state.currentUser._id;
      contact.appId = this.data.application._id;
      contact.appTypeName = this.data.application.appTypeName;
      contact.age = this.getAge(this.data.application.dateOfBirth);

      // blockchain circle properties
      var applicationData = new Object();
      applicationData.name = contact.appId;
      applicationData.type1 = contact.appTypeName;
      applicationData.type = "create-product";
      applicationData.user = "aanvrager";
      applicationData.amount = "60";
      applicationData.size = "35";
      if (applicationData.type1 == "Schengen Visa") {
        applicationData.color = "blue";  
      } else if (applicationData.type1 == "Caribbean Visa") {
        applicationData.color = "yellow";
        applicationData.size = "16";
      } else if (applicationData.type1 == "Travel document") {
        applicationData.color = "purple"; 
      } else {
        applicationData.color = "red";
        applicationData.size = "16";
      }  

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
      return this.data.messages.map((message) => {
        return <Message datetime={message.datetime} subject={message.subject} content={message.content} />
      });
    },

    getApplicationDetails: function(){
      var d = this.data.application.dateOfBirth;
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear();
      console.log("data application", this.data.application);
      var details = this.data.application.gender + " | " + datestring;
      console.log("appType in details", this.state.appType);
      if (this.data.application.appTypeName  == "Schengen Visa" || this.data.application.appTypeName == "Caribbean Visa") {
        details += " | " + this.data.application.travelPurpose + " | " + this.data.application.period;
      } else if (this.data.application.appTypeName  == "Travel document") {
        details += " | " + this.data.application.maritalStatus + " | " + this.data.application.travelDoc;
      } else {
        details += " | " + this.data.application.legalDoc;        
      }
      return details;
    },
    render: function(){

      if (this.data.appsLoading) {
        return <Loading />;
      }

      var details = this.getApplicationDetails();
      var title = "Application for " + this.data.application.appTypeName;  
    
      return (
        <AppCanvas>

          <Card>
            <CardHeader
              title={title}
              subtitle={this.state.fullName}
              avatar={this.state.currentUser.profile.photo}
            />
            
            <CardTitle title={this.data.application.status} subtitle={details} />
            <CardText>
              <MessageList messages={this.data.messages} />     
            </CardText>
            

            <CardActions>
              <RaisedButton label="Pay" secondary={true} 
                      onClick={this.getComponent}  />
              <RaisedButton primary={true} 
                    label="Submit Application" onClick={this.submitApp}  />
            </CardActions>
          </Card>

      </AppCanvas>

      );
    }
    
});