## Node Knowledge Application
### [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) YouTube channel course
---

Notes:
* Installed MongoDB in c:\MDB
* Set up project with npm init, installed(-S) express, and wrote simple node server(ES6 code)
* Using Pug as templating engine and mongoose to help us work with mongodb
* Installed nodemon, a tool that keeps the npde server up to date and running
* Created collection articles inside nkb and added test articles
* installed body-parser, so we can parse req.url
* Added public folder, for storing static files. Every file inside this folder is accessible at /filename.extension
* Installed Bower package manager globally, so we can use bootstrap
* To have bower's components inside the public folder, we add a file called .bowerrc in the root folder of our application in which we define the folder in which we want bower's components to be installed. All we need to add to .bowerrc is { "directory": "public/bower_components" }. After we edited the file, when we use bower to install bootstrap for example, using bower install bootstrap, it will install it inside the folder we have set in the .bowerrc file.
* To add bootstrap styles to our code we just add a link to bootstrap in our layout.pug file, setting its href to "/bower_components/bootstrap/dist/css/bootstrap.css".
* To convert html markup to pug/jade code, we use the [jade to html](http://html2jade.org/) convertor
* Using AJAX call to delete articles for security reasons
* Installed node-messages middleware together with connect-flash, to render us the ability to send flash messages
* Using express-validator to validate user input and express-session to keep track of user data
* Using Passport authentication middleware. Passport is a good choice because of the different strategies it offers. We can use a local strategy, which means we store the passwords inside a database, or we can log in with facebook or twitter credentials.
* Installed passport, passport-local(using the local strategy), and bcryptjs(helps us hash passwords and then compare hashes).
* Inside our project we create a config folder with a database.js containing: 
```javascript
module.exports = {
    database: 'mongodb://localhost:27017/nkb',  // 27017 is the default port for mongo
    secret: 'secret'
}
```
This will allow us to use code such as:
```javascript
const config = require('./config/database.js');
```
The config constant contains the object exported by the database.js file, and we can access like any other object:
```javascript
mongoose.connect(config.database);
```
We can import that object in any other file we might need it.
* A great way to persist user data is through sessions, storing user data into a global variable, and then sending res.locals.user to every template we render