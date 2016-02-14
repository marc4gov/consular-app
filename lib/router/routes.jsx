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

FlowRouter.route('/newapp', {  
  action() {
    ReactLayout.render(NewApplication);
  }
});

FlowRouter.route('/home', {  
  action() {
    ReactLayout.render(GridListSimple);
  }
});

FlowRouter.route('/schengenvisa', {  
  action() {
    
    ReactLayout.render(NewApplication, { name: "Schengen Visa", img: "schengenvisa"});
  }
});

FlowRouter.route('/logout', {  
  action() {
    AccountsTemplates.logout();
    //ReactLayout.render(MainLayout, { nav: "Home", main: "Logout called", footer: "Footer"});
  }
});

FlowRouter.route('/pay', {  
  action() {
        ReactLayout.render(Welcome);           
  }
});

FlowRouter.route('/paymentform', {  
  action: function(queryParams) {
    //console.log("Query Params:", queryParams.checkoutId);
    ReactLayout.render(Pay, queryParams);
  }
});

FlowRouter.route('/paymentsuccess', {  
  action: function() {
    Session.set('resourcePath', FlowRouter.current().queryParams.resourcePath);
    //console.log(current);
    console.log("Query Params:", Session.get('resourcePath'));
    //var resourcePath = Session.get('resourcePath');
    ReactLayout.render(PaymentSuccess, {resourcePath : Session.get('resourcePath')});
  }
});
