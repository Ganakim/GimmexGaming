import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
var fs = Npm.require('fs')
var path = require('path')

Meteor.startup(() => {
  
});

Meteor.methods({
  fetchcss(){
    var themes = [
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
    ]
    fs.writeFile(`${process.env['PWD']}/client/theme.css`, '', (err)=>{
      if (err){
        console.log(err)
      }
      console.log('File Cleared');
    });

    var counter = 0
    themes.forEach((theme)=>{
      HTTP.get(`https://www.w3schools.com/lib/w3-theme-${theme}.css`, (err, res)=>{
        if(err){
          console.log('There were errors reteiving ',theme)
        }else{
          var rules = `/*${theme}*/\n${res.content
          .replace(/w3-theme/g, theme)
          .replace(/w3-text-theme/g, `${theme}-text`)
          .replace(/w3-border-theme/g, `${theme}-border`)
          .replace(/w3-hover-theme/g, `${theme}-hover`)
          .replace(/w3-hover-text-theme/g, `${theme}-hover-text`)
          .replace(/w3-hover-border-theme/g, `${theme}-hover-border`)
          .replace(`${theme}-action`, `btn-${theme}`)
          }\n`
          
          var ps = {
            'l4color':new RegExp(`\\.${theme}-l4 .*?#(.*?) `),
            'l4bg':new RegExp(`\\.${theme}-l4 .*?-color:#(.*?) `),
            'lightcolor':new RegExp(`\\.${theme}-light .*?#(.*?) `),
            'lightbg':new RegExp(`\\.${theme}-light .*?-color:#(.*?) `),
          }
          var as = {}
          for(var p in ps){
            as[p] = ps[p].exec(rules)[1]
          }
          
          fs.appendFile(`${process.env['PWD']}/client/theme.css`, rules, (err)=>{
            if (err){
              console.log(err)
            }
            counter++
            console.log(theme, counter);
          });
          fs.appendFile(`${process.env['PWD']}/client/theme.css`, `.btn-${theme}-light {color:#${as.lightcolor} !important; background-color: #${as.lightbg} !important}\n.btn-${theme}-light:hover {color:#${as.l4color} !important; background-color:#${as.l4bg} !important; border-color:#${as.l4bg} !important}\n`, (err)=>{
            if (err){
              console.log(err)
            }
          });
        }
      })
    })
  },
  insert(col, item){
    Collections[col].insert(item);
  },
  update(col, change){
    Collections[col.type].update(col.selector, change);
  },
  remove(col){
    Collections[col.type].remove(col.selector);
    if(col.type === "Decks"){
      Meteor.users.update(this.userId, {$pull:{'profile.decks':col.selector}});
    }
  },
  changeUsername(username){
    Accounts.setUsername(this.userId, username)
  },
  changeTheme(theme){
    Meteor.users.update(this.userId, {$set:{theme:theme}})
  },
  linkDeviant(){},
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

for(var collection in Collections){
  if(collection === 'Users'){
    Meteor.publish('Users', ()=>{
      return Collections.Users.find()
    })
  }else{
    Meteor.publish(collection, ()=>{
      return Collections[collection].find()
    })
  }
}

Accounts.onCreateUser((options, user) => {
  user.theme = 'light-blue';
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});