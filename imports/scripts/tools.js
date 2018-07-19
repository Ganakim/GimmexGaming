Tools = {
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
    return a == b
  },
  search(collection, where, id, part){
    var result
    if(id){
      result = Collections[collection].findOne(id)
    }else{
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
}
for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}