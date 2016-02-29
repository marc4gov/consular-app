MainLayout = React.createClass({
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          {this.props.main}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
});