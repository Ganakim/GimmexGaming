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

FlowRouter.route('/game/:name', {
  action(params, queryParams){
    console.log(params, queryParams)
    Session.set('content', 'game')
  }
})
