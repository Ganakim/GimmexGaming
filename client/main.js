import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import './main.html'
import './imports.js'

Template.main.helpers({
  content(){
    return Session.get('content');
  }
})

Template.main.events({
  'click .dropdownTrigger': function(e){
    var target = $(e.target).hasClass('dropdownTrigger') ? $(e.target) : $(e.target).parent()
    var flat = target.next('.dropdown').hasClass('flat')
    setTimeout(()=>{
      if(flat){
        target.next('.dropdown').removeClass('flat')
      }else{
        target.next('.dropdown').addClass('flat')
      }
      target.children('.dropdownIndicator-left, .dropdownIndicator-right').toggleClass('flat')
    })
    $('.chatBoxToggle').addClass('far').removeClass('fas')
    $('#chatBox').addClass('hidden', 100)
  },
  'click *':function(e){
    if(!$.contains($('.logins')[0], e.target)){
      if(!$('.dropdown').hasClass('flat')){
        $('.dropdown').addClass('flat')
        $('.dropdown.flat').closest('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
      }
    }
  }
})

Tracker.autorun(()=>{
  if(Meteor.subscribe('Chats').ready()){
    Meteor.subscribe('Chats', ()=>{
      console.log(Tools.search('Chats'))
    })
  }
  if(Meteor.subscribe('Users').ready()){
    Meteor.subscribe('Users', ()=>{
      console.log(Tools.search('Users'))
    })
  }
})