import './chat.html'
import './chat.css'

var myChat

Template.chat.helpers({
  myChat(receiver, sender){
    if(receiver){
      myChat = Chats.find({$or:[{receiver:receiver, sender:sender},{receiver:sender, sender:receiver}], public:false}).fetch()
    }else{
      myChat = Chats.find({receiver:Session.get('targetArtist'), public:true}).fetch()
    } 
    return myChat
  },
  newTimestamp(index){
    if(index > 0){
      return JSON.stringify(myChat[index].timestamp.date) != JSON.stringify(myChat[index-1].timestamp.date)
    }else{
      return true
    }
  }
})

Template.chat.events({
  'submit #chatBoxSend': function(e){
    e.preventDefault()
    if($(e.target).children('div').text().trim()){
      console.log(this)
      Meteor.call('insert', 'Chats', {sender:Meteor.userId(),receiver:this.sender||Session.get('targetArtist'),public:this.sender?false:true,body:$(e.target).children('div').text().trim(),timestamp:Tools.genTimestamp()})
    }
    $(e.target).children('div').text('')
  }
})