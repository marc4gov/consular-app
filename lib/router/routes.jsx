FlowRouter.route('/izzy', {  
  action() {
    ReactLayout.render(VisaCard);
  }
});


FlowRouter.route('/newapp', {  
  action() {
    ReactLayout.render(NewApplication);
  }
});

FlowRouter.route('/photodetect', {  
  action() {
    ReactLayout.render(PhotoDetect);
  }
});

FlowRouter.route('/home', {  
  action() {
      ReactLayout.render(MainLayout, { 
          main: <GridListSimple/>
      });
  }
});

FlowRouter.route('/', {  
  action() {
      ReactLayout.render(MainLayout, { 
          main: <HomeCard name='schengenvisa' />
      });
  }
});

FlowRouter.route('/schengenvisa', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
      ReactLayout.render(MainLayout, { 
          main: <NewApplication 
                  name="Schengen Visa"
                  img="schengenvisa"
                 />
      });
  }
});

FlowRouter.route('/logout', {  
  action() {
    AccountsTemplates.logout();
  }
});


FlowRouter.route('/applications', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
      ReactLayout.render(MainLayout, { 
          main: <ApplicationList />
      });
  }
});

FlowRouter.route('/pay', {
  triggersEnter: [AccountsTemplates.ensureSignedIn], 
  action() {
      ReactLayout.render(MainLayout, { 
          main: <Welcome />
      });
  }
});

FlowRouter.route('/paymentform', {
  triggersEnter: [AccountsTemplates.ensureSignedIn], 
  action: function(queryParams) {
    //console.log("Query Params:", queryParams.checkoutId);
    ReactLayout.render(Pay, queryParams);
  }
});

FlowRouter.route('/paymentsuccess', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],  
  action: function() {
    Session.set('resourcePath', FlowRouter.current().queryParams.resourcePath);
    //console.log(current);
    console.log("Query Params:", Session.get('resourcePath'));
    //var resourcePath = Session.get('resourcePath');
    ReactLayout.render(PaymentSuccess, {resourcePath : Session.get('resourcePath')});
  }
});
