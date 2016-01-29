ProfilePage = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() { // will re-run once the subscription is ready
    this.userProfileSub = Meteor.subscribe('userProfile', this.props.userId);
    return {
      user: Meteor.users.findOne(this.props.userId)
    }
  },

  render() { // if data is ready show profile component, else show loading component
    return this.data.user ? <Profile user={this.data.user} /> : <Loading />;
  }

});