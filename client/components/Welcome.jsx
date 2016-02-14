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
    Styles,
    SvgIcons,
    List,
    ListItem
    } = MUI;

var { ThemeManager, LightRawTheme } = Styles;

Welcome = React.createClass({

/*
  mixins: [ReactMeteorData],
  getMeteorData() {
    // This is the place to subscribe to any data you need
    //var streamData;
    
    Meteor.call('userFeedToken', function(err, token) {
        if(err) console.error(err);
        //Meteor.subscribe('Stream.feeds.user', 10, '1');
        console.log("Token=", token);
        /*
        var feed = Stream.feedManager.getUserFeed('1', token);

        var subscription = feed.subscribe(function callback(data) {
          console.log(data.new[0]);
          toastr.success(data.new[0].actor, data.new[0].verb);
                          }).then(null, this.failCallback);

        // All API calls are performed asynchronous and return a Promise object
        /*
        feed.get({limit:5})
        .then(function(data) { 
          streamData = data.results;
          toastr.success(data.results[0].actor, data.results[0].verb);
          console.log(streamData);
              return {
                strData: streamData
              };
        })
        .catch(function(reason) { console.log(reason)});
        
    });
    


  },
  */
    getComponent: function(shopperResultUrl) {
        console.log("CheckoutId:", Session.get("checkoutId"));
        FlowRouter.go('/paymentform?checkoutId=' + Session.get("checkoutId")
                      + '&shopperResultUrl=/' + shopperResultUrl
                      );
    },

    hitPay: function() {
        Meteor.call('requestPay', function(err, result) {
          console.log("checkoutId: ", result.data.id);
          Session.set("checkoutId", result.data.id);
          console.log("Session checkoutId: ", Session.get("checkoutId"));
          //this.props.checkoutId = result.data.id;
        });    
    },



  render: function () {

      return (
      <AppCanvas>
      <Card>
        <CardActions>
          <FlatButton label="Get Payment Checkout ID" 
                      onClick={this.hitPay} />
          <FlatButton label="Get Payment Form" 
                      onClick={this.getComponent.bind(this, "home")} />
        </CardActions>  
      </Card>
      </AppCanvas>
      );
  }
});