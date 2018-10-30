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
  },
})

Tracker.autorun(()=>{
  for(var collection in Collections){
    if(Meteor.subscribe(collection).ready()){
      Meteor.subscribe(collection, ()=>{
        console.log(collection, Tools.search(collection))
      })
    }
  }
  if(Meteor.subscribe('Users').ready()){
    Meteor.subscribe('Users', ()=>{
      console.log(Tools.search('Users'))
    })
  }
})