
//injectTapEventPlugin();

const {
    AppCanvas,
    Card,
    CardHeader,
    CardText,
    CardActions,
    RaisedButton,
    MenuItem,
    List,
    ListItem,
    TextField,
    Divider,
    Paper,
    SelectField,
    DatePicker
    } = MUI;

const {
  SvgIcons
} = MUI.Libs


const style = {
  marginLeft: 20,
};

NewLegalDocApplication = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  // Loads items from the collection
  getMeteorData() {
    Meteor.subscribe("images");
    Meteor.subscribe("applications");
    return {
      applications: Applications.find({}).fetch()
    }
  },
  getInitialState: function () {
    var appType = Session.get("appType");
    console.log("appType = ", appType);

    return {
      myself: Meteor.user(),
      gender: "Male",
      legalDoc: "Birth Certificate",
      appType: appType
    };
  },

  handleGenderChange: function(event, index, value) {
    this.setState({gender: value});
  },  
  handleLegalDocChange: function(event, index, value) {
    this.setState({legalDoc: value});
  },
  handleOccupationChange: function(event, index, value) {
    this.setState({occupation: value});
  },  
  handleLocationChange: function(event, index, value) {
    this.setState({location: value});
  },
  getValueFromSelect: function (ref){
    var divDOMNode = ReactDOM.findDOMNode(ref);
    /* the children in my case were a label and the select itself. 
       lastChild would point to the select child node*/
    var selectNode = divDOMNode.lastChild;
    return selectNode.options[selectNode.selectedIndex].text;
  },

  getFormData: function() {
    var data = {
      passportNumber: this.refs.passportNumber.getValue(),
      legalDoc: this.state.legalDoc,
      dateOfBirth: this.refs.dateOfBirth.getDate(),
      gender: this.state.gender,
    }
    return data
  },
  handleSubmit: function() {
      var data = this.getFormData();
      console.log("insertMessage...");
      Meteor.call("insertMessage", {
        applicant: Meteor.userId(),
        datetime: new Date(),
        subject: "New Application for " + this.state.appType.name,
        content: "New Application, go Pay and then Submit"
      });
      console.log("Data", data);
      Applications.insert({
        passportNumber: data.passportNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        legalDoc: data.legalDoc,
        status: "Open",
        appTypeName: this.state.appType.name,
        createdAt: new Date(),            // current time
        applicant: Meteor.userId(),           // _id of logged in user
      });
      FlowRouter.go('/applications')
  },


  render: function () {

    return (
      <AppCanvas>

        <Card>
        <CardHeader
          title="New Application"
          subtitle={this.state.appType.name}
          avatar={this.state.appType.image}
        />
        

        <TextField
          ref="passportNumber"
          floatingLabelText="Passport Number"
          style={style}
          value="1234ABC56" />
        <DatePicker 
          ref="dateOfBirth"
          floatingLabelText="Date of Birth"
          style={style}
          container="inline" mode="landscape"/>
        <SelectField
          ref="gender"
          floatingLabelText="Gender"
          style={style}
          value={this.state.gender} onChange={this.handleGenderChange}>
            <MenuItem value={"Male"} primaryText="Male"/>
            <MenuItem value={"Female"} primaryText="Female"/>
        </SelectField>
        <SelectField
          ref="legalDoc"
          floatingLabelText="Legal Doc Type"
          style={style}
          value={this.state.legalDoc} onChange={this.handleLegalDocChange}>
            <MenuItem value={"Birth Certificate"} primaryText="Birth Certificate"/>
            <MenuItem value={"Proof of Marriage"} primaryText="Proof of Marriage"/>
            <MenuItem value={"Driving license"} primaryText="Driving license"/>
            <MenuItem value={"School Certificate"} primaryText="School Certificate"/>
        </SelectField>
        <CardText>
          <FileUpload uploadtype="photo"/>
          
          <FileUpload uploadtype="passportscan"/>
          <Scan />
        </CardText>
        <CardActions>
        <RaisedButton primary={true}
          type="submit"
          label="Submit"
          onClick={this.handleSubmit}
        />
        </CardActions>
        </Card>
    </AppCanvas>
   );
  }
});