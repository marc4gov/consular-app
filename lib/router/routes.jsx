FlowRouter.route('/', {  
  action() {
    ReactLayout.render(MainLayout, { nav: "Header", main: "Marc Minnee", footer: "Footer"});
  }
});

FlowRouter.route('/home', {  
  action() {
    ReactLayout.render(MainLayout, { nav: "Home", main: <Loading />, footer: "Footer"});
  }
});

FlowRouter.route('/logout', {  
  action() {
    AccountsTemplates.logout();
    //ReactLayout.render(MainLayout, { nav: "Home", main: "Logout called", footer: "Footer"});
  }
});

