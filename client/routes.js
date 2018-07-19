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
  name: 'Home',
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