//app.jsx
injectTapEventPlugin();

var {
    AppCanvas,
    Tabs,
    Tab,
    Styles,
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

App = React.createClass({
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
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Sign In" value="a" >
          <div>
            <h2>Log out</h2>
                Hit the button to Sign In
            <FlatButton label="Sign In" 
                        onClick={this.goSignIn}/>
            
          </div>
        </Tab>
        <Tab label="Log out" value="b">
          <div>
            <h2>Log out</h2>
            <p>
            Hit the button to Log out
            <FlatButton label="Log out" 
                        onClick={this.goLogout}/>
            </p>
          </div>
        </Tab>
        <Tab label="Tab C" value="c">
          <div>
            <h2>Controllable Tab C</h2>
            <p>
              asasdadadsasd.
            </p>
          </div>
        </Tab>
      </Tabs>
    );
}
});