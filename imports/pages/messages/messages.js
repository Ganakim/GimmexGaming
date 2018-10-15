import './messages.html'
import './messages.css'

Session.set('currentArtistContact', false)

Template.messages.helpers({
  pmSenders(){
    var senders = []
    for(var chat of Chats.find({receiver:Meteor.userId(), public:false}).fetch()){
      if(senders.indexOf(chat.sender) === -1){
        senders.push(chat.sender)
      }
    }
    console.log(senders)
    return senders
  },
  currentArtistContact(){
    return Session.get('currentArtistContact')
  },
  currentArtistContactConvo(){
    return Chats.find({$or:[{receiver:Meteor.userId(), sender:Session.get('currentArtistContact')}, {receiver:Session.get('currentArtistContact'), sender:Meteor.userId()}], public:false}).fetch()
  },
  people(){
    return {receiver:Meteor.userId(), sender:Session.get('currentArtistContact')}
  }
})

Template.messages.events({
  'click .tabs .btn': function(){
    Session.set('currentArtistContact', this.toString())
  }
})
