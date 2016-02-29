
injectTapEventPlugin();

const {
    AppCanvas,
    Card,
    CardHeader,
    RadioButton,
    RaisedButton,
    RadioButtonGroup,
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
    return {
      applications: Applications.find({}).fetch()
    }
  },
  getInitialState: function () {
    Meteor.subscribe("images");
    Meteor.subscribe("applications");
    return {
      myself: Meteor.user(),
      gender: "Male",
      travelPurpose: "Tourism",
      costOfStay: "Myself",
      submitted: null
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
  handleTravelPurposeChange: function(event, index, value) {
    this.setState({travelPurpose: value});
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
      dateOfBirth: this.refs.dateOfBirth.getDate(),
      gender: this.state.gender,
      costOfStay: this.state.costOfStay,
      travelPurpose: this.state.travelPurpose
    }
    return data
  },
  handleSubmit: function() {
      var data = this.getFormData();
      console.log("Data", data);
      Applications.insert({
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        costOfStay: data.costOfStay,
        travelPurpose: data.travelPurpose,
        status: "Open",
        createdAt: new Date(),            // current time
        applicant: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username,  // username of logged in user
        createdAt: new Date() // current time
      });
      FlowRouter.go('/applications')
  },

  render: function () {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>Form data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return (
        <AppCanvas>

            <Card>
            <CardHeader
            title="New Application"
            subtitle="Visa"
            avatar={this.state.myself.profile.photo}
            />
            </Card>

  <Paper zDepth={2}>
          <DatePicker 
            ref="dateOfBirth"
            floatingLabelText="Date of Birth"
            hintText="What is your date of birth?"
            style={style}
            underlineShow={false} 
            container="inline" mode="landscape"/>
        <Divider />
        <SelectField
            ref="gender"
            floatingLabelText="Gender"
            style={style}
            value={this.state.gender} onChange={this.handleGenderChange}>
          <MenuItem value={"Male"} primaryText="Male"/>
          <MenuItem value={"Female"} primaryText="Female"/>
        </SelectField>
        <Divider />
        <SelectField
            ref="travelPurpose"
            floatingLabelText="Travel Purpose"
                        style={style}
            value={this.state.travelPurpose} onChange={this.handleTravelPurposeChange}>
          <MenuItem value={"Business"} primaryText="Business"/>
          <MenuItem value={"Family"} primaryText="Family"/>
          <MenuItem value={"Tourism"} primaryText="Tourism"/>
        </SelectField>
        <Divider />    
        <SelectField
            ref="costOfStay"
            floatingLabelText="Cost of Travel & Stay"
                        style={style}
            value={this.state.costOfStay} onChange={this.handleCostChange}>
          <MenuItem value={"Myself"} primaryText="By Myself"/>
          <MenuItem value={"Sponsor"} primaryText="By a Sponsor"/>
        </SelectField>
        <Divider />    
        <FileUpload/>
        <Photo/>
        <Divider />
        <FlatButton
          type="submit"
          label="Submit"
          onClick={this.handleSubmit}
        />
   </Paper>
   </AppCanvas>
   );
  }
});