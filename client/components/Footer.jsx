//app.jsx
//injectTapEventPlugin();

var {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    ToolbarSeparator,
    Styles,
    FontIcon,
    RaisedButton,
    FlatButton,
    IconButton,
    IconMenu,
    MoreVertIcon,
    MenuItem,
    DatePicker
} = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

Footer = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
  getInitialState: function () {
    //Meteor.subscribe("images");
    //Meteor.subscribe("applications");
    return {
      value: 'a',
    };
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
 <Toolbar>
    <ToolbarGroup firstChild={true} float="left">
    </ToolbarGroup>
    <ToolbarGroup float="right">
      <ToolbarTitle text="Options" />
      <ToolbarSeparator />
      <FlatButton label="Create Broadcast" primary={true} />
    </ToolbarGroup>
  </Toolbar>
    );
}
});