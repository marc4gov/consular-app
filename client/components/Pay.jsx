//app.jsx
//injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    FlatButton,
    IconButton,
} = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

Pay = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
    componentWillMount() {
        const script = document.createElement("script");
        script.src = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + Session.get("checkoutId");
        script.async = true;
        document.body.appendChild(script);
    },
    render: function () {

        return (
            <div>
            <form action="http://localhost:3000/paymentsuccess" className="paymentWidgets">VISA MASTER AMEX
            </form>
            </div>
            );
}
});