var {
    AppCanvas,
    AppBar,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    FlatButton,
    TextField,
    Styles,
    List,
    ListItem
    } = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

ApplicationList = React.createClass({

  mixins: [ReactMeteorData],
 
  // Loads items from the collection
  getMeteorData() {
    var currentUser = Meteor.user();
    var handle = Meteor.subscribe('applications', currentUser._id);
    return {
      appsLoading: ! handle.ready(), // Use handle to show loading state
      application: Applications.findOne({applicant: currentUser._id})
    };
  },

    getInitialState: function(){
      var initial = { 
          "currentUser": Meteor.user()
      };

      return initial;
    },
    //general lifecycle methods
    componentWillMount: function(){
    },
    componentDidMount: function(){
       this.setState({
          results: this.data.applications
        })
    },
    //what page is currently viewed
    setPage: function(index){
    },
    //this will handle how the data is sorted
    sortData: function(sort, sortAscending, data){
    },
    //this changes whether data is sorted in ascending or descending order
    changeSort: function(sort, sortAscending){
    },
    //this method handles the filtering of the data
    setFilter: function(filter){
    },
    //this method handles determining the page size
    setPageSize: function(size){
    },
    getComponent: function(){
        console.log("go Pay");
        FlowRouter.go('/pay');
    },
    render: function(){
    if (this.data.appsLoading) {
      return <Loading />;
    }
    
        return (
        <AppCanvas>

            <Card>
            <CardHeader
            title="Application for Visa"
            subtitle={this.state.currentUser.profile.firstName}
            avatar={this.state.currentUser.profile.photo}
            />
            
            <CardTitle title={this.data.application.status} subtitle={this.data.application.travelPurpose} />


        <CardActions>
            <FlatButton label="Pay" primary={true} onClick={this.getComponent}  />
        </CardActions>
        </Card>

      </AppCanvas>
      );
    }
    
});