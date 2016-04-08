
//injectTapEventPlugin();

var {
    AppBar,
    Tabs,
    Tab,
    Styles,
    Card,
    CardHeader,
    RaisedButton,
    FlatButton,
    IconButton,
    IconMenu,
    NavigationClose,
    NavigationExpandMore,
    MoreVertIcon,
    MenuItem,
    DatePicker
} = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

Header = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

      // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  // Loads items from the collection
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },
  getInitialState: function () {
    //Meteor.subscribe("images");
    //Meteor.subscribe("applications");
    var currentUser = Meteor.user();
    var appType= Session.get("apptype");
    if (currentUser == null) return {fullName : "Guest"};
    return {
      fullName: currentUser.profile.firstName + " " + currentUser.profile.surName
    }
  },
  handleChange: function(value) {
    this.setState({value: value});
  },
  goHome: function(){
    FlowRouter.go('/home')
  },
  goPhotoDetect: function(){
    FlowRouter.go('/photodetect')
  },
  goApplications: function(){
    FlowRouter.go('/applications')
  },
  goSignIn: function(){
    FlowRouter.go('/sign-in')
  },
  goLogout: function(){
    FlowRouter.go('/logout')
  },
    render: function () {
        //let VIcon = <SvgIcons.MoreVertIcon />

    return (
  <AppBar
    title="Herinrichting Consulaire processen 2018"
    iconElementLeft={
      <IconMenu
        iconButtonElement={
          <IconButton><SvgIcons.NavigationExpandMore /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Home"  onClick={this.goHome}/>
        <MenuItem primaryText="Sign in" onClick={this.goSignIn} />
        <MenuItem primaryText="Applications"  onClick={this.goApplications}/>
        <MenuItem primaryText="Photo Recognition" onClick={this.goPhotoDetect}/>        
        <MenuItem primaryText="Sign out" onClick={this.goLogout}/>
      </IconMenu>
    }
    children={ this.data.currentUser ?
                  <Card>
            <CardHeader
            title="Signed In"
            subtitle={this.state.fullName}
            avatar={this.data.currentUser.profile.photo}
            />
            </Card> : ''
    }
  />

    );
  }
});