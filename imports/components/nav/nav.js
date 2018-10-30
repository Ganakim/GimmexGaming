import './nav.html'
import './nav.css'

Template.nav.helpers({
  
})

Template.nav.events({
  'click #logoutBtn': function(e){
    AccountsTemplates.logout()
  },
  'click #logoutBtn, click #at-btn': function(e){
    $(e.target).closest('.dropdown').addClass('flat')
    $(e.target).closest('.dropdown.flat').closest('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
  },
  'click .dropdownTrigger': function(e){
    var target = $(e.target).hasClass('dropdownTrigger') ? $(e.target) : $(e.target).parent()
    if(target.next('.dropdown').attr('id') == 'devsListDropdown'){
      $('#gamesListDropdown, #gamesListDropdownInd').addClass('flat')
    }else if(target.next('.dropdown').attr('id') == 'gamesListDropdown'){
      $('#devsListDropdown, #devsListDropdownInd').addClass('flat')
    }
  },
})

Template.gameCard.events({
  'click .gameCard': function(e){
    $('#gamesListDropdown, #gamesListDropdownInd').addClass('flat')
    FlowRouter.go(`/game/${this.name}`)
  },
})