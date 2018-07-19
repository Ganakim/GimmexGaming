import { Meteor } from 'meteor/meteor'
var fs = Npm.require('fs')
var path = require('path')

Meteor.startup(() => {
  
});

Meteor.methods({
  insert(col, item){
    Collections[col].insert(item);
  },
  update(col, change){
    Collections[col.type].update(col.selector, change);
  },
  remove(col){
    Collections[col.type].remove(col.selector);
    if(col.type === "Decks"){
      Meteor.users.update(Meteor.userId(), {$pull:{'profile.decks':col.selector}});
    }
  },
  create(type, name){
    console.log(`creating ${name} ${type === 'c' ? 'component' : 'page'}`)
    if(type === 'c' || type === 'p' && name){
      console.log('creating directory')
      fs.mkdir(`${process.env['PWD']}/imports/${type === 'c' ? 'components' : 'pages'}/${name}`, 0o777, ()=>{
        console.log('creating html')
        fs.appendFile(`${process.env['PWD']}/imports/${type === 'c' ? 'components' : 'pages'}/${name}/${name}.html`, `<template name="${name}">\n\t<div>\n\t\t${name}\n\t</div>\n</template>`, (err)=>{
          if (err){
            console.log(err)
          }
          console.log('html created');
        });
        console.log('creating js')
        fs.appendFile(`${process.env['PWD']}/imports/${type === 'c' ? 'components' : 'pages'}/${name}/${name}.js`, `import './${name}.html'\nimport './${name}.css'`, (err)=>{
          if (err){
            console.log(err)
          }
          console.log('js created');
        });
        console.log('creating css')
        fs.appendFile(`${process.env['PWD']}/imports/${type === 'c' ? 'components' : 'pages'}/${name}/${name}.css`, ``, (err)=>{
          if (err){
            console.log(err)
          }
          console.log('css created');
        });
        console.log('linking')
        fs.appendFile(`${process.env['PWD']}/client/imports.js`, `import '/imports/${type === 'c' ? 'components' : 'pages'}/${name}/${name}.js'\n`, (err)=>{
          if (err){
            console.log(err)
          }
          console.log('css created');
        });
      })
    }else{
      console.log(type)
    }
  }
})

// for(var collection in Collections){
//   Meteor.publish(collection, ()=>{
//     return Collections[collection].find()
//   })
// }

Meteor.publish('users', function(){
  return Collections.Users.find();
});

Meteor.publish('chats', function(){
  return Collections.Chats.find();
});