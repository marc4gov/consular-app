FlowRouter.route('/izzy', {  
  action() {
    ReactLayout.render(VisaCard);
  }
});

FlowRouter.route('/gridlist', {  
  action() {
    ReactLayout.render(GridListSimple);
  }
});

FlowRouter.route('/home', {  
  action() {
    ReactLayout.render(MainLayout, { nav: "Home", main: <Loading />, footer: "Footer"});
  }
});

FlowRouter.route('/schengenvisa', {  
  action() {
    ReactLayout.render(VisaCard, { name: "Schengen Visa", img: "schengenvisa"});
  }
});

FlowRouter.route('/logout', {  
  action() {
    AccountsTemplates.logout();
    //ReactLayout.render(MainLayout, { nav: "Home", main: "Logout called", footer: "Footer"});
  }
});

