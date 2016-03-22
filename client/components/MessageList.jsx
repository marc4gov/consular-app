MessageList = React.createClass({

  renderMessages() {
    return this.props.messages.map((message) => {
      return <Message key={message._id} datetime={message.datetime} 
                  subject={message.subject} 
                  content={message.content} />;
    });
  },
 
  render() {
    return (
      <div>
          <h4>Messages</h4>

          {this.renderMessages()}

      </div>
    );
  }
});