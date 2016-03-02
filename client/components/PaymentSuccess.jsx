//app.jsx
//injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    Dialog,
    RaisedButton,
    FlatButton,
} = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

PaymentSuccess = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
  getInitialState() {
    return {
      open: false
    }
  },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
    componentWillMount() {
        this.getPaymentStatus();
    },
    handleOpen: function(){
        this.setState({open: true});
    },
    handleClose: function(){
        this.setState({open: false});
    },
    goHome: function() {
        Flowrouter.go("/home");  
    },
    getPaymentStatusCode: function() {
        return Session.get("paymentStatus");  
    }, 
    getPaymentStatus: function() {
        console.log("resourcePath", this.props.resourcePath);
        Meteor.call('requestPaymentStatus', this.props.resourcePath, function(err, result) {
          console.log("result: ", result.statusCode);
          Session.set("paymentStatus", result.statusCode);
        }); 
    },
    render: function () {
        var displayIcon;
        if (Session.get("paymentStatus") == 200) {
            displayIcon = <SvgIcons.ActionDone color='Green'/>;
        } else {
            displayIcon = <SvgIcons.ActionDone color='Red'/>;
        }
        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onTouchTap={this.handleClose}
            />
            ];

        return (

      <AppCanvas>

        <RaisedButton label="Payment Status" onTouchTap={this.handleOpen} />
        <Dialog
          title="Payment Status"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Payment: {displayIcon}
        </Dialog>
      
        
      </AppCanvas>
            );
    }
});