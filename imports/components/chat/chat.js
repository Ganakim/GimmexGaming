import './chat.html'
import './chat.css'

Template.chat.helpers({
  myChat(){
    if(Session.get('currentArtist')){
      return Chats.find({receiver:Session.get('currentArtist')._id}).fetch()
    }
  }
})

Template.chat.events({
  'submit #chatBoxSend': function(e){
    e.preventDefault()
    if($('#chatBoxSend>div').text().trim()){
      Meteor.call('insert', 'Chats', {sender:Meteor.userId(),receiver:Session.get('currentArtist')._id,body:$('#chatBoxSend>div').text().trim(),timestamp:moment().format('MMM D YYYY, h:mm a')})
    }
    $('#chatBoxSend>div').text('')
  }
})