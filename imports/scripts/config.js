AccountsTemplates.configure({
    texts: {
      title: {
        signIn: '',
        signUp:''
      },
    }
});
var pwd = AccountsTemplates.removeField('password');
var email = AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 3,
  },
  email,
  pwd
]);