Photo = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
      return Meteor.user();
  },
  	render() {
    	return (
      		<div>
          		<img src={this.data.profile.photo} />
      		</div>
    	);
  	}
});