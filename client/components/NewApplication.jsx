
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
  SelectField,
  MenuItem,
  TextField,
  DatePicker
} = MUI;

var {
  SvgIcons,
} = MUI.Libs;

var { ThemeManager, LightRawTheme } = Styles;

NewApplication = React.createClass({

  getInitialState() {
    return {
      value: 2
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  handleChange: function(event, index, value){
    this.setState({value});
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },
  getComponent: function(name) {
    //var test1 = this.props.firstName.value;
    console.log(this.props.children);
    //FlowRouter.go('/pay')
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
              actAsExpander={false}
              showExpandableButton={true}
            />
            <div style={{padding: '80px',}}>

            <TextField
              ref="firstName"
              hintText="enter Name"
              errorText="This field is required"/>
            <br/>
            <DatePicker hintText="enter Birth Date"/>
            <br/>
            <SelectField value={this.state.value} ref="selectF" onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Never"/>
              <MenuItem value={2} primaryText="Every Night"/>
              <MenuItem value={3} primaryText="Weeknights"/>
              <MenuItem value={4} primaryText="Weekends"/>
              <MenuItem value={5} primaryText="Weekly"/>
            </SelectField>
            <CardActions expandable={false}>
            <RaisedButton label="Save Application" 
                onClick={this.getComponent.bind(this,this.props.name)} 
            />
            </CardActions>
            </div>

        </Card>

      </AppCanvas>
      );
}
});