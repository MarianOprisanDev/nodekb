const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


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

app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add article"
    });
});

//submit post route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('dirname is: ' + __dirname);
    console.log('joined dirname and folder:' + path.join(__dirname, 'views'));
});