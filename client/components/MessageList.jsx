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
          <b>Messages</b>

          {this.renderMessages()}

      </div>
    );
  }
});