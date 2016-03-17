
//injectTapEventPlugin();

const {
    AppCanvas,
    Card,
    CardHeader,
    FlatButton,
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

NewApplication = React.createClass({

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
      period: "Short stay",
      travelPurpose: "Tourism",
      occupation: "Tourism",
      location: "ACC",
      travelEU: "No",
      costOfStay: "Myself",
      appType: appType
    };
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  handleCostChange: function(event, index, value) {
    this.setState({costOfStay: value});
  },
  handleGenderChange: function(event, index, value) {
    this.setState({gender: value});
  },  
  handlePeriodChange: function(event, index, value) {
    this.setState({period: value});
  },
  handleTravelDocChange: function(event, index, value) {
    this.setState({travelDoc: value});
  },
  handleTravelEUChange: function(event, index, value) {
    this.setState({travelEU: value});
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
  handleDrop: function (dataTransfer) {
    var files = dataTransfer.files;
    console.log("Files: ", files);
    // Do something with dropped files... 
  },
  getFormData: function() {
    var data = {
      passportNumber: this.refs.passportNumber.getValue(),
      travelEU: this.state.travelEU,
      dateOfBirth: this.refs.dateOfBirth.getDate(),
      gender: this.state.gender,
      period: this.state.period,
      location: this.state.location,
      occupation: this.state.occupation,
      costOfStay: this.state.costOfStay,
      travelPurpose: this.state.travelPurpose
    }
    return data
  },
  handleSubmit: function() {
      var data = this.getFormData();
      console.log("Data", data);
      Applications.insert({
        passportNumber: data.passportNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        period: data.period,
        location: data.location,
        occupation: data.occupation,
        costOfStay: data.costOfStay,
        travelPurpose: data.travelPurpose,
        travelEU: data.travelEU,
        status: "Open",
        createdAt: new Date(),            // current time
        applicant: Meteor.userId(),           // _id of logged in user
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
        </Card>

        <TextField
          ref="passportNumber"
          floatingLabelText="Passport Number"
          style={style}
          value="1234ABC56" />
        <TextField
          ref="bsn"
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
            <MenuItem value={"Gehuwd"} primaryText="Gehuwd"/>
            <MenuItem value={"Gescheiden"} primaryText="Gescheiden"/>
            <MenuItem value={"Gescheiden"} primaryText="Gescheiden"/>
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
        <SelectField
          ref="occupation"
          floatingLabelText="Occupation"
          style={style}
          value={this.state.occupation} onChange={this.handleOccupationChange}>
            <MenuItem value={"Athlete"} primaryText="Athlete"/>
            <MenuItem value={"Car buyer"} primaryText="Car buyer"/>
            <MenuItem value={"Commercant"} primaryText="Commercant"/>
            <MenuItem value={"Footballer"} primaryText="Footballer"/>
            <MenuItem value={"Cultural"} primaryText="Cultural"/>
            <MenuItem value={"Sport"} primaryText="Sport"/>
            <MenuItem value={"Self-employed"} primaryText="Self-employed"/>
            <MenuItem value={"Tourism"} primaryText="Tourism"/>        
        </SelectField> 
        <SelectField
          ref="costOfStay"
          floatingLabelText="Cost of Travel & Stay"
          style={style}
          value={this.state.costOfStay} onChange={this.handleCostChange}>
            <MenuItem value={"Myself"} primaryText="By Myself"/>
            <MenuItem value={"Sponsor"} primaryText="By a Sponsor"/>
        </SelectField>
        <SelectField
          ref="travelEU"
          floatingLabelText="Travel with EU family member"
          style={style}
          value={this.state.travelEU} onChange={this.handleTravelEUChange}>
            <MenuItem value={"Yes"} primaryText="Yes"/>
            <MenuItem value={"No"} primaryText="No"/>
        </SelectField>
        <SelectField
          ref="location"
          floatingLabelText="Location of Visa Pick-up"
          style={style}
          value={this.state.location} onChange={this.handleLocationChange}>
            <MenuItem value={"ACC"} primaryText="Accra"/>
            <MenuItem value={"ADD"} primaryText="Addis Abeba"/>            
            <MenuItem value={"BAM"} primaryText="Bamako"/>            
            <MenuItem value={"COT"} primaryText="Cotonou"/>
            <MenuItem value={"DAK"} primaryText="Dakar"/>
            <MenuItem value={"KHA"} primaryText="Khartoum"/>
            <MenuItem value={"RAB"} primaryText="Rabat"/>
        </SelectField>

        <FileUpload uploadtype="photo"/>
        <Divider />
        <FileUpload uploadtype="passportscan"/>
        <Scan/>
        <Divider />
        <FlatButton
          type="submit"
          label="Submit"
          onClick={this.handleSubmit}
        />
    </AppCanvas>
   );
  }
});