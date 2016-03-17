
//injectTapEventPlugin();

const {
    AppCanvas,

    TextField,
    MenuItem,
    SelectField,
    DatePicker
    } = MUI;

const {
  SvgIcons
} = MUI.Libs


const style = {
  marginLeft: 20,
};

ApplicationFields = React.createClass({

  // Loads items from the collection

  getInitialState: function () {
    var appType = Session.get("appType");
    console.log("appType = ", appType);
    Meteor.subscribe("images");
    Meteor.subscribe("applications");
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

  handleCostChange: function(event, index, value) {
    this.setState({costOfStay: value});
  },
  handleGenderChange: function(event, index, value) {
    this.setState({gender: value});
  },  
  handlePeriodChange: function(event, index, value) {
    this.setState({period: value});
  },
  handleTravelPurposeChange: function(event, index, value) {
    this.setState({travelPurpose: value});
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

  getFieldNames: function(name) {
    var inputs = [];
    if (name == "schengenvisa") {
        inputs.push( 
                          { "type":"select", 
                            "ref": "period",
                            "options": ["Short stay", "Long stay"],
                            "stateChange" : "handlePeriodChange"
                          },
                          { "type":"select", 
                            "ref": "travelPurpose",
                            "options": ["Business", "Family", "Tourism", "Private", "Sports", "Studies", "Au-pairs"],
                            "stateChange" : "handleTravelPurposeChange"
                          },
                          { "type":"select", 
                            "ref": "occupation",
                            "options": ["Athlete", "Car buyer", "Footballer", "Commercant", "Sport", "Cultural", "Self-employed", "Tourism"],
                            "stateChange" : "handleOccupationChange"
                          },
                          { "type":"select", 
                            "ref": "location",
                            "options": ["ACC", "ADD", "BAM", "COT", "DAK", "KHA", "RAB"],
                            "stateChange" : "handleOccupationChange"
                          },

                          );
    }
    return inputs;
  },

  render: function () {

    return (
      <div>
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
          ref="period"
          floatingLabelText="Period"
          style={style}
          value={this.state.period} onChange={this.handlePeriodChange}>
            <MenuItem value={"Short stay"} primaryText="Short stay"/>
            <MenuItem value={"Long stay"} primaryText="Long stay"/>
        </SelectField>
        <SelectField
          ref="travelPurpose"
          floatingLabelText="Travel Purpose"
          style={style}
          value={this.state.travelPurpose} onChange={this.handleTravelPurposeChange}>
            <MenuItem value={"Business"} primaryText="Business"/>
            <MenuItem value={"Family"} primaryText="Family"/>
            <MenuItem value={"Tourism"} primaryText="Tourism"/>
            <MenuItem value={"Private"} primaryText="Private"/>
            <MenuItem value={"Sports, Cultural"} primaryText="Sports, Cultural"/>
            <MenuItem value={"Studies"} primaryText="Studies"/>
            <MenuItem value={"Au-pairs"} primaryText="Au-pairs"/>
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
        </div>
   );
  }
});