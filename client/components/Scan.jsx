Scan = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
      return Meteor.user();
  },
  	render() {
    	return (
      		<div>
            <table>
            <tbody>
            <tr>
              <td>Photo<br/><img src={this.data.profile.photo} /></td>
              <td>Passport Scan<br/><img src={this.data.profile.passportscan} /></td>
            </tr>
            </tbody>
            </table>
      		</div>
    	);
  	}
});