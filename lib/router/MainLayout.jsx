MainLayout = React.createClass({
  render() {
    return (
      <div>
        <header>
          {this.props.nav}
        </header>
        <main>
          {this.props.main}
        </main>
        <footer>
          {this.props.footer}
        </footer>
      </div>
    );
  }
});