FlowRouter.notFound={
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', '404')
  }
}

FlowRouter.route('/', {
  action(){
    FlowRouter.go('/home')
  }
})

FlowRouter.route('/home', {
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', 'home')
  }
})

FlowRouter.route('/artists', {
  action(params, queryParams){
    console.log(params, queryParams)
    Session.set('content', 'browse')
  }
})

FlowRouter.route('/artist/:id', {
  action(params, queryParams){
    console.log(params, queryParams)
    Session.set('content', 'artist')
  }
})

FlowRouter.route('/artist/:id/:tab', {
  action(params, queryParams){
    console.log(params, queryParams)
    Session.set('content', 'artist')
  }
})

FlowRouter.route('/messages', {
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', 'messages')
    Session.set('targetArtist', Meteor.userId())
  }
})

FlowRouter.route('/settings', {
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', 'settings')
    Session.set('targetArtist', Meteor.userId())
  }
})