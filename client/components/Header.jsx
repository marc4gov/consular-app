//app.jsx
injectTapEventPlugin();

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
    return null;
  },
  handleChange: function(value) {
    this.setState({value: value});
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
    title="Proof of Concept FOBO 2018"
    iconElementLeft={
      <IconMenu
        iconButtonElement={
          <IconButton><SvgIcons.NavigationExpandMore /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign in" onClick={this.goSignIn} />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={this.goLogout}/>
      </IconMenu>
    }
    children={ this.data.currentUser ?
                  <Card>
            <CardHeader
            title="Logged in"
            subtitle={this.data.currentUser.profile.surName}
            avatar={this.data.currentUser.profile.photo}
            />
            </Card> : ''
    }
  />

    );
}
});