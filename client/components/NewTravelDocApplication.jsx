
//injectTapEventPlugin();

const {
    AppCanvas,
    Card,
    CardHeader,
    CardText,
    CardActions,
    RaisedButton,
    MenuItem,
    TextField,
    SelectField,
    DatePicker
    } = MUI;

const {
  SvgIcons
} = MUI.Libs


const style = {
  marginLeft: 20,
};

NewTravelDocApplication = React.createClass({

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
      maritalStatus: "Married",
      travelDoc: "Paspoort",
      location: "ACC",
      appType: appType
    };
  },

  handleGenderChange: function(event, index, value) {
    this.setState({gender: value});
  },  
  handleMaritalChange: function(event, index, value) {
    this.setState({maritalStatus: value});
  },  
  handleTravelDocChange: function(event, index, value) {
    this.setState({travelDoc: value});
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
      bsnNumber: this.refs.bsnNumber.getValue(),
      maritalStatus: this.state.maritalStatus,
      travelDoc: this.state.travelDoc,
      dateOfBirth: this.refs.dateOfBirth.getDate(),
      gender: this.state.gender,
      location: this.state.location
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
        bsnNumber: data.bsnNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        travelDoc: data.travelDoc,
        location: data.location,
        status: "Open",
        applicant: Meteor.userId(),           // _id of logged in user
        appTypeName: this.state.appType.name,
        createdAt: new Date() // current time
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
        <TextField
          ref="bsnNumber"
          floatingLabelText="BSN Number"
          style={style}
          value="188830000" />
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
          ref="maritalStatus"
          floatingLabelText="Marital Status"
          style={style}
          value={this.state.maritalStatus} onChange={this.handleMaritalChange}>
            <MenuItem value={"Married"} primaryText="Married"/>
            <MenuItem value={"Divorced"} primaryText="Divorced"/>
            <MenuItem value={"Single"} primaryText="Single"/>
        </SelectField>
        <SelectField
          ref="travelDoc"
          floatingLabelText="Travel Doc Type"
          style={style}
          value={this.state.travelDoc} onChange={this.handleTravelDocChange}>
            <MenuItem value={"Paspoort"} primaryText="Paspoort"/>
            <MenuItem value={"Tweede Paspoort"} primaryText="Tweede Paspoort"/>
            <MenuItem value={"Zakenpaspoort"} primaryText="Zakenpaspoort"/>
            <MenuItem value={"ID kaart"} primaryText="ID kaart"/>
            <MenuItem value={"Noodpaspoort"} primaryText="Noodpaspoort"/>
            <MenuItem value={"Laissez-passer"} primaryText="Laissez-passer"/>
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