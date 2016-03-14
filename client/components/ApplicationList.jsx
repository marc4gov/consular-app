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
    FlatButton,
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
    return {
      appsLoading: ! handle.ready(), // Use handle to show loading state
      application: Applications.findOne({applicant: currentUser._id})
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

      convert(this.state.currentUser.profile.photo, function(base64Img){
          contact.photofile = base64Img.replace("data:image/png;base64,", "");
          convert(passportscan, function(base64Img2){
                    contact.passportscan = base64Img2.replace("data:image/png;base64,", "");
                    console.log("passportscan", contact.passportscan);
                    Meteor.call("fetchFromService", contact);
                    toastr.success(contact.fullName, "Application submitted");
          });
      });

    },
    getComponent: function(){
        console.log("go Pay");
        FlowRouter.go('/pay');
    },

    render: function(){

      if (this.data.appsLoading) {
        return <Loading />;
      }
    
      return (

        <AppCanvas>

          <Card>
            <CardHeader
            title="Application for Visa"
            subtitle={this.state.fullName}
            avatar={this.state.currentUser.profile.photo}
            />
            
            <CardTitle title={this.data.application.status} subtitle={this.data.application.travelPurpose} />

            <CardActions>
              <FlatButton label="Pay" onClick={this.getComponent}  />
              <FlatButton label="Submit Application" onClick={this.submitApp}  />
            </CardActions>
          </Card>

      </AppCanvas>

      );
    }
    
});