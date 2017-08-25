const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// connecting mongoose to our database
// nkb is the name of the database we have set for this project
mongoose.connect('mongodb://localhost/nkb');
let db = mongoose.connection;

// check connection
db.once('open', () => {
    console.log("Connected to MongoDB");
});

// check for db errors
db.on('error', (error) => {
    console.log(error);
});

// initializing app
const app = express();

// bring in models
let Article = require('./models/article');

// loading view engine
// __dirname would be something like C:\Users\lvl\node\nodekb, and after path.join, \views will be added to that names
app.set('views', path.join(__dirname, 'views'));
// setting pug as the view engine
app.set('view engine', 'pug');

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// set public folder, for static files
app.use(express.static(path.join(__dirname, 'public')));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  // setting a global variable named messages to the module express-messages
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// () => { } is equivalent to function() { }; introduced in the ES6 standard
app.get('/', (req, res) => {
    // we use the Article variable we defined above
    // empty {} as first argument to the find() function means find all
    Article.find({}, (err, articles) => {
        // checking if find() returned an error
        if (err) {
            console.log(err);
        } else {
            // rendering index.pug, passing query results as argument
            res.render('index', {
                title: "Articles",
                articles: articles
            });
        }

    });

    // // rendering the index.pug file
    // res.render('index', {
    //     title: "Articles",
    //     articles: articles
    // });
});

// Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('dirname is: ' + __dirname);
    console.log('joined dirname and folder:' + path.join(__dirname, 'views'));
});