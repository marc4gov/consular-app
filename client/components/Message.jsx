Message = React.createClass({
    getDateString: function(d){
        //var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        // d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        return (d + "");
    },
  	render() {
    	return (
      		<div>
              {this.getDateString(this.props.datetime)}  |  <b>{this.props.subject}</b> : {this.props.content}
              <br/>
      		</div>
    	);
  	}
});