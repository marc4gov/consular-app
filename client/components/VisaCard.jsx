
injectTapEventPlugin();

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
  SvgIcons,
  ActionAndroid,
  DatePicker
} = MUI;


var { ThemeManager, LightRawTheme } = Styles;

VisaCard = React.createClass({
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
        let imglocation = "/images/" + this.props.img + ".jpeg"
        //let idp = Session.get("id");
        return (
          <AppCanvas>
            <Card>
            <CardHeader
            title={this.props.name}
            subtitle="Submit your application online"
            avatar="data:image/jpeg;base64,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"
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardMedia expandable={true}
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

      <div style={{padding: '80px',}}>
      <RaisedButton primary={true} label="Tap"/>
      <br/>
      <DatePicker hintText="Portrait Dialog"/>
      <br/>
      <DatePicker
      hintText="Landscape Dialog"
      mode="landscape"/>
      </div>
      </AppCanvas>
      );
}
});