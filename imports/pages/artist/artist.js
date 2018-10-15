import './artist.html'
import './artist.css'

import './space/space'
import './gallery/gallery'
import './contact/contact'

Template.artist.helpers({
  artistNavBtns(){
    return [
      {text: 'Home', path: 'artistHome'},
      {text: 'Gallery', path: 'artistGallery'},
      {text: 'Contact', path: 'artistContact'}
    ]
  },
  currentArtistPage(){
    return Session.get('currentArtistPage')
  }
})

Template.artist.events({
  'click .artistNavBtn': function(e){
    Session.set('currentArtistPage', this.path)
  },
  'click .chatBoxToggle': function(e){
    $(e.target).closest('.chatBoxToggle').toggleClass('far').toggleClass('fas')
    $('#chatBox').toggleClass('hidden', 100)
    $('.dropdown').addClass('flat')
    $('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
  }
})