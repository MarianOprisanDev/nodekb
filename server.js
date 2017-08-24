const express = require('express');
const path = require('path');

// initializing app
const app = express();

// loading view engine
// __dirname would be something like C:\Users\lvl\node\nodekb, and after path.join, \views will be added to that names
app.set('views', path.join(__dirname, 'views'));
// setting pug as the view engine
app.set('view engine', 'pug');

// () => { } is equivalent to function() { }; introduced in the ES6 standard
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: "Article One",
            author: "Brad",
            body: "This is article one"
        },
        {
            id: 2,
            title: "Article Two",
            author: "Jim",
            body: "This is article two"
        },
        {
            id: 3,
            title: "Article Three",
            author: "Megan",
            body: "This is article Three"
        }
    ];

    // rendering the index.pug file
    res.render('index', {
        title: "Articles",
        articles: articles
    });
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