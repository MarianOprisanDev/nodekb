const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('dirname is: ' + __dirname);
    console.log('joined dirname and folder:' + path.join(__dirname, 'views'));
});