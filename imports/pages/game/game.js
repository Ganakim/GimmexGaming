import './game.html'
import './game.css'

Template.game.helpers({
  game(){
    return Tools.search('Games', {'name': FlowRouter.getParam("name")}, false, false)[0]
  }
})