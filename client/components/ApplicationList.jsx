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

    submitApp: function(){
      var contact = new Object();
      contact.fullName = this.data.currentUser.profile.firstName + " " + this.data.currentUser.profile.surName;
      contact.country = this.data.currentUser.profile.country;
      contact.nationality = this.data.currentUser.profile.nationality;
      contact.birthDate = this.data.currentUser.profile.birthDate;
      contact.passportNumber = this.data.currentUser.profile.passportNumber;
      contact.travelPurpose = this.data.application.travelPurpose;    
      contact.costOfStay = this.data.application.costOfStay;
      contact.gender = this.data.application.gender;
      contact.userId = this.data.currentUser._id;
      contact.appId = this.data.application
      contact.age = this.getAge(this.data.currentUser.profile.birthDate);

      Meteor.call("fetchFromService", contact);
      toastr.success(contact.fullName, "Application submitted");
    },
    getComponent: function(){
        console.log("go Pay");
        FlowRouter.go('/pay');
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

    submitApp: function(){
      var contact = new Object();
      contact.fullName = this.state.currentUser.profile.firstName + " " + this.state.currentUser.profile.surName;
      contact.countryOfBirth = this.state.currentUser.profile.countryOfBirth;
      contact.nationality = this.state.currentUser.profile.nationality;
      contact.dateOfBirth = this.data.application.dateOfBirth;
      contact.passportNumber = this.data.application.passportNumber;
      contact.travelPurpose = this.data.application.travelPurpose;    
      contact.costOfStay = this.data.application.costOfStay;
      contact.gender = this.data.application.gender;
      contact.userId = this.state.currentUser._id;
      contact.appId = this.data.application._id;
      contact.age = this.getAge(this.data.application.dateOfBirth);

      console.log("Appdata", contact);

      Meteor.call("fetchFromService", contact);
      toastr.success(contact.fullName, "Application submitted");
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