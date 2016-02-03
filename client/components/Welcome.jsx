Welcome = React.createClass({
  hitPay: function() {
          Meteor.call('requestPay', function(result) {
          console.log("Success: ", result);
          //ReactLayout.render(VisaCard, { name: {result}, img: "schengenvisa"});      
        });    
      },



  render() {
    return <div>
      <h1>Hit</h1>
      <button onClick={this.hitPay}>Hit</button>
    </div>
  }
});