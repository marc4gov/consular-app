
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
  IconMenu,
  MoreVertIcon,
  MenuItem,
  ActionAndroid,
  DatePicker
} = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

HomeCard = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },
  getComponent: function(name) {
    console.log(name);
    FlowRouter.go('/'+ tile.link)
  },
  render: function () {
        //let VIcon = <SvgIcons.MoreVertIcon />
        let imglocation = "/images/" + this.props.name + ".jpeg"
        //let idp = Session.get("id");
        return (
          <AppCanvas>
            <Card>
            <CardMedia
            overlay={<CardTitle title="Consular Affairs" subtitle="Submit your application online" />}
            >
            <img src={imglocation} />

            </CardMedia>
            <CardActions expandable={true}>
            <FlatButton label="New Application" onClick={this.getComponent.bind(this,this.props.name)} />
            <FlatButton
            label="Label after"
            labelPosition="after"
            primary={true}
        //style={styles.button}
        icon={<SvgIcons.ActionAndroid />}
        />
        </CardActions>
        </Card>

      </AppCanvas>
      );
}
});