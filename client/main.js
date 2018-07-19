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
    target.next('.dropdown').toggleClass('flat')
    target.children('.dropdownIndicator-left, .dropdownIndicator-right').toggleClass('flat')
    $('.chatBoxToggle').addClass('far').removeClass('fas')
    $('#chatBox').addClass('hidden', 100)
  }
})

Tracker.autorun(()=>{
  if(Meteor.subscribe('chats').ready()){
    console.log('Chats are ready')
    Meteor.subscribe('chats', ()=>{
      console.log(Tools.search('Chats'))
    })
  }
  if(Meteor.subscribe('users').ready()){
    Meteor.subscribe('users', ()=>{
      console.log(Tools.search('Users'))
    })
  }
})