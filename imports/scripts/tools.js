Tools = {
  increment(a,b){
    return a + b
  },
  capitalize(s){
    return s.replace(/^\w/, function (chr) {
      return chr.toUpperCase()
    });
  },
  pluralize(s){
    return s + 's'
  },
  log(s){
    console.log(s)
  },
  owner(id){
    return Meteor.userId() === id
  },
  is(a, b){
    return a === b
  },
  not(a){
    return !a
  },
  join(...args){
    args.pop()
    var tmp = {}
    var isKey = true
    var key
    for(var arg of args){
      if(isKey){
        key = arg
      }else{
        tmp[key] = arg
      }
      isKey = !isKey
    }
    return tmp
  },
  search(collection, where, id, part){
    var result
    if(id){
      result = Collections[collection].findOne(id)
    }else{
      if(where){
        console.log('Where: ',where)
      }
      result = Collections[collection].find(where ? where : {}, {many:true}).fetch()
    }
    if(result){
      if(part){
        return result[part]
      }else{
        return result
      }
    }
  },
  genTimestamp(){
    var parts = ['date','h','mm','a']
    var time = {}
    for(var part of parts){
      if(part === 'date'){
        time.date = {MMM:moment().format('MMM'), D:moment().format('D'), YYYY:moment().format('YYYY')}
      }else{
        time[part] = moment().format(part);
      }
    }
    return time
  },
  targetArtist(){
    return Tools.search('Users', false, Session.get('targetArtist'))
  },
  themes(){
    return {
      colors:[
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'khaki',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
        'blue-grey',
        'brown',
        'grey',
        'dark-grey',
        'black'
      ],
      themes:[
      
      ]
    }
  },
}
for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}