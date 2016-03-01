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
      var initial = { 
          "currentUser": Meteor.user()
      };

      return initial;
    },
    //general lifecycle methods
    componentWillMount: function(){
    },
    componentDidMount: function(){
       this.setState({
          results: this.data.applications
        })
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
    render: function(){
    if (this.data.appsLoading) {
      return <Loading />;
    }
    
        return (
        <AppCanvas>

            <Card>
            <CardHeader
            title="Application for Visa"
            subtitle={this.state.currentUser.profile.firstName}
            avatar={this.state.currentUser.profile.photo}
            />
            
            <CardTitle title={this.data.application.status} subtitle={this.data.application.travelPurpose} />


        <CardActions>
            <FlatButton label="Pay" primary={true} onClick={this.getComponent}  />
             <FlatButton label="Submit" onClick={this.submitApp}  />
       </CardActions>
        </Card>

      </AppCanvas>
      );
    }
    
});