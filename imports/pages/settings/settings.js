import './settings.html'
import './settings.css'

Session.set('artistOptionTab', 'space')
Session.set('sampleBtn', 'top')

Template.settings.onCreated(()=>{
  if(!Meteor.userId()){
    FlowRouter.redirect(`/home`)
  }
})

Template.settings.helpers({
  tabs(){
    return [
      {text: 'My Space', tab:'space'},
      {text: 'Profile', tab:'profile'},
      {text: 'Theme', tab:'theme'},
      {text: 'Chat', tab:'chatMod'},
      {text: 'Connections', tab:'connections'},
      {text: 'Feedback', tab:'feedback'},
      {text: 'Donate', tab:'donate'},
      {text: 'Destroy my Account', tab:'dma'},
    ]
  },
  artistOptionTab(){
    return Session.get('artistOptionTab')
  }
})

Template.theme.helpers({
  tempTheme(){
    return Session.get('tempTheme')
  },
  sampleBtn(){
    return Session.get('sampleBtn')
  }
})

Template.settings.events({
  'click .tabs .btn': function(e){
    Session.set('artistOptionTab', this.tab)
  },
  'submit #usernameChange': function(e){
    e.preventDefault()
    if($('#usernameChange>input').val() && $('#usernameChange>input').val() !== Meteor.user().username){
      Meteor.call('changeUsername', $('#usernameChange>input').val(), (err)=>{
        if(err){
          displayOptionsErr('username', 'Something went wrong, please send feedback!', 'text-danger')
        }else{
          displayOptionsErr('username', 'Username successfully changed!', 'text-success')
        }
      })
    }else{
      displayOptionsErr('username', 'Invalid Username', 'text-danger')
    }
  },
  'submit #passwordChange': function(e){
    e.preventDefault()
    if($('[name=Cpassword]').val()){
      if($('[name=Npassword]').val() && $('[name=CNpassword]').val()){
        if($('[name=Npassword]').val() === $('[name=CNpassword]').val()){
          $('[for=Npassword]>div').text('')
          Accounts.changePassword($('[name=Cpassword]').val(), $('[name=Npassword]').val(), (err)=>{
            if(err){
              displayOptionsErr('Cpassword', 'Something went wrong, please send feedback!', 'text-danger')
            }else{
              displayOptionsErr('Cpassword', 'Password successfully changed!', 'text-success')
            }
          })
        }else{
          displayOptionsErr('Npassword', 'Passwords do not match!', 'text-danger')
        }
      }else{
        displayOptionsErr('Cpassword', 'You must enter a New Password', 'text-danger')
      }
    }else{
      displayOptionsErr('Cpassword', 'You must enter your Current Password', 'text-danger')
    }
  },
  'click .themeBtn': function(e){
    Session.set('tempTheme', this.toString())
  },
  'click .applyTheme': function(){
    if(Session.get('tempTheme') && Session.get('tempTheme') != Meteor.user().theme){
      Meteor.call('changeTheme', Session.get('tempTheme'), (err)=>{
        if(err){
          $('.themeSuccessMsg').text('Oops, something went wrong, please try again. If the problem persists, please send feedback!').removeClass('text-success').addClass('text-danger')
        }else{
          $('.themeSuccessMsg').html('Theme succesfully changed to <b class="' + Session.get('tempTheme') + '-text ml-2">' + Session.get('tempTheme') + '</b>').removeClass('text-danger').addClass('text-success')
        }
      })
    }
  },
  'click .sampleBtn': function(e){
    Session.set('sampleBtn', e.target.classList[0])
  },
  'click #deviantArtBtn' :function(e){
    // Meteor.call('linkDeviant')
    HTTP.get(`https://www.deviantart.com/oauth2/authorize`, {
      params:{
        'response_type':'code',
        'client_id':8443,
        'redirect_uri':'https://capstoneii-ganakim.cs50.io'
      },
      headers:{
        'Access-Control-Allow-Origin':'*'
      },
    }, (err, res)=>{
      if(err){
        console.log(err)
      }
      console.log(res)
    })
  },
})

function displayOptionsErr(label, message, color){
  $(`[for=${label}]>div`).text(message).removeClass('text-success','text-danger').addClass(color)
}