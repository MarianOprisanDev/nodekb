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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set public folder, for static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Add Article Page
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: "Add article"
    });
});

// Get Single Article
// when catching /:placeholderName we should be careful because it will catch everything whose path mathes until the :
// and consider everything after the : as matching its path( /article/* is a match)
app.get('/articles/:id', (req, res) => {
    // we use the model here
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('article', {
                article: article
            });
        }
    });
});

//submit post route
// everithing sending POST requests to /articles/add will be caught by this block of code
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

// Load edit form
app.get('/articles/edit/:id', (req, res) => {
    // we use the model here
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('edit_article', {
                title: 'Edit Article',
                article: article
            });
        }
    });
});

// Update submit
app.post('/articles/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id: req.params.id}
    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
});


app.delete('/articles/:id', (req, res) => {
    let query = {_id: req.params.id};

    Article.remove(query, (err) => {
        if(err) {
            console.log(err);
        }

        res.send('Success');
    });
})
// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('dirname is: ' + __dirname);
    console.log('joined dirname and folder:' + path.join(__dirname, 'views'));
});