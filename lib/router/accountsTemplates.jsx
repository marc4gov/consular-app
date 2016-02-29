AccountsTemplates.configure({
  defaultLayoutType: 'blaze-to-react',
  defaultTemplate: 'fullPageAtForm',  // default
  defaultLayout: MainLayout,
  defaultContentRegion: 'main',
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,


    // Hooks
/*
    onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    preSignUpHook: myPreSubmitFunc,
    postSignUpHook: myPostSubmitFunc,
*/
    // Texts
    texts: {

        button: {
          changePwd: "Change Password Now",
          enrollAccount: "Enroll Text",
          forgotPwd: "Forgot Password",
          resetPwd: "Reset Password",
          signIn: "Sign In",
          signUp: "Register",
        },

      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
    },
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
});

AccountsTemplates.addFields([
    {
    _id: 'surName',
    type: 'text',
    displayName: "Surname (Family name)",
    },
    {
    _id: 'surNameAtBirth',
    type: 'text',
    displayName: "Surname at birth (Former family name(s))",
    },
    {
     _id: 'firstName',
    type: 'text',
    displayName: "First name(s) (Given name(s))",
    },
    {
    _id: 'placeOfBirth',
    type: 'text',
    displayName: "Place of Birth",
    },
    {
    _id: 'address',
    type: 'text',
    displayName: "Address",
    },
    {
    _id: 'phone',
    type: 'tel',
    displayName: "Phone",
    required: true
    }

]);

AccountsTemplates.addField({
    _id: "gender",
    type: "select",
    displayName: "Gender",
    select: [
        {
            text: "Male",
            value: "male",
        },
        {
            text: "Female",
            value: "female",
        },
    ],
});

AccountsTemplates.addField({
    _id: "countryOfBirth",
    type: "select",
    displayName: "Country of Birth",
    select: [
        {
            text: "China",
            value: "China",
        },
        {
            text: "Pakistan",
            value: "Pakistan",
        },
        {
            text: "Indonesia",
            value: "Indonesia",
        },
    ]
});

AccountsTemplates.addField({
    _id: "nationality",
    type: "select",
    displayName: "Current nationality",
    select: [
        {
            text: "Chinese",
            value: "China",
        },
        {
            text: "Pakistani",
            value: "Pakistani",
        },
        {
            text: "Indonesian",
            value: "Indonesian",
        }
    ]
});


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');