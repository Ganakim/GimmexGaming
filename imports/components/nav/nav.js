import './nav.html'
import './nav.css'

Session.set('artistSearchResults', [])

Template.nav.helpers({
  artistSearchResults(){
    return Session.get('artistSearchResults')
  },
})

Template.nav.events({
  'input #artistSearch': function(e){
    var regex = new RegExp($(e.target).val().split(), 'gi')
    Session.set('artistSearchResults', $(e.target).val() ? Meteor.users.find({username:{$regex:regex}}).fetch() : [])
  },
  'click .artistSearchResult': function(e){
    FlowRouter.go(`/artist/${$(e.target).closest('.artistSearchResult').attr('id')}`)
    location.reload()
  },
  'click #logoutBtn': function(e){
    AccountsTemplates.logout()
  },
  'click #logoutBtn, click #at-btn': function(e){
    var target = $(e.target).closest('.dropdown').siblings('.dropdownTrigger')
    target.next('.dropdown').toggleClass('flat')
    target.children('.dropdownIndicator-left, .dropdownIndicator-right').toggleClass('flat')
  }
})