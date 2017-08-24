## Node Knowledge Application
### [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) YouTube channel course
---

Notes:
* Installed MongoDB in c:\MDB
* Set up project with npm init, installed(-S) express, and wrote simple node server(ES6 code)
* Using Pug as templating engine
* Installed nodemon, a tool that keeps the npde server up to date and running
* Created nkb collection inside mongodb
* Created collection articles inside nkb and added test articles
* Installed mongoose to help us work with mongodb
* installed body-parser, so we can parse req.url
* Added public folder, for storing static files. Every file inside this folder is accessible at /filename.extension
* Installed Bower package manager globally, so we can use bootstrap
* To have bower's components inside the public folder, we add a file called .bowerrc in the root folder of our application in which we define the folder in which we want bower's components to be installed. All we need to add to .bowerrc is { "directory": "public/bower_components" }. After we edited the file, when we use bower to install bootstrap for example, using bower install bootstrap, it will install it inside the folder we have set in the .bowerrc file.
* To add bootstrap styles to our code we just add a link to bootstrap in our layout.pug file, setting its href to "/bower_components/bootstrap/dist/css/bootstrap.css".
* To convert html markup to pug/jade code, we use the [jade to html](http://html2jade.org/) convertor
* Using AJAX call to delete articles