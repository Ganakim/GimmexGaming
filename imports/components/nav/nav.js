import './nav.html'
import './nav.css'

Session.set('artistSearchResults', [])

Template.nav.helpers({
  artistSearchResults(){
    return Session.get('artistSearchResults')
  },
})

Template.nav.events({
  'click #artistBrowse': function(e){
    FlowRouter.go(`/artists`)
    Session.set('content', 'browse')
  },
  'input #artistSearch': function(e){
    var regex = new RegExp($(e.target).val().split(), 'gi')
    Session.set('artistSearchResults', $(e.target).val() ? Meteor.users.find({username:{$regex:regex}}).fetch() : [])
  },
  'click .artistSearchResult': function(e){
    FlowRouter.go(`/artist/${$(e.target).closest('.artistSearchResult').attr('id')}`)
    Session.set('content', 'artist')
    Session.set('targetArtist', FlowRouter.current().params.id)
    Session.set('currentArtistPage', FlowRouter.current().params.tab || 'artistHome')
    Session.set('artistSearchResults', [])
    $('#artistSearch input').val('')
  },
  'click #msgsBtn': function(e){
    FlowRouter.go(`/messages`)
    Session.set('content', 'messages')
  },
  'click #settingsBtn': function(e){
    FlowRouter.go(`/settings`)
    Session.set('content', 'settings')
  },
  'click #logoutBtn': function(e){
    AccountsTemplates.logout()
    if(Session.get('currentArtistPage') === 'artistOptions'){
      Session.set('currentArtistPage', 'artistHome')
    }
  },
  'click #msgsBtn, click #settingsBtn, click #logoutBtn, click #at-btn': function(e){
    $(e.target).closest('.dropdown').addClass('flat')
    $(e.target).closest('.dropdown.flat').closest('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
  },
  'focusout #artistSearch form input': function(){
    setTimeout(()=>{
      Session.set('artistSearchResults', [])
    },200)
  },
  'focus #artistSearch form input': function(e){
    var regex = new RegExp($(e.target).val().split(), 'gi')
    Session.set('artistSearchResults', $(e.target).val() ? Meteor.users.find({username:{$regex:regex}}).fetch() : [])
    $('.chatBoxToggle').addClass('far').removeClass('fas')
    $('#chatBox').addClass('hidden', 100)
  }
})