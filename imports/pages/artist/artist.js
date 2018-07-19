import './artist.html'
import './artist.css'

Session.set('currentArtistPage', 'artistHome')

Template.artist.onRendered(()=>{
  Session.set('currentArtist', Tools.search('Users', false, FlowRouter.current().params.id, false))
})

Template.artist.helpers({
  artist(){
    return Session.get('currentArtist')
  },
  artistNavBtns(){
    if(Session.get('currentArtist')){
      return Tools.owner(Session.get('currentArtist')._id) ? [
        {text: 'Home', path: 'artistHome'},
        {text: 'Gallery', path: 'artistGallery'},
        {text: 'Contact', path: 'artistContact'},
        {text: 'Options', path: 'artistOptions'}
      ] : [
        {text: 'Home', path: 'artistHome'},
        {text: 'Gallery', path: 'artistGallery'},
        {text: 'Contact', path: 'artistContact'}
      ]
    }
  },
  currentArtistPage(){
    return Session.get('currentArtistPage')
  }
})

Template.artist.events({
  'click .artistNavBtn': function(e){
    Session.set('currentArtistPage', this.path)
    $('.artistNavBtn').removeClass('btn-primary').addClass('btn-light')
    $(`#${Session.get('currentArtistPage')}`).addClass('btn-primary').removeClass('btn-light')
  },
  'click .chatBoxToggle': function(e){
    $(e.target).closest('.chatBoxToggle').toggleClass('far').toggleClass('fas')
    $('#chatBox').toggleClass('hidden', 100)
    $('.dropdown').addClass('flat')
    $('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
  }
})