const express = require('express');
const router = express.Router();
let Article = require('../models/article');

// Add Article Page
router.get('/add', (req, res) => {
    res.render('add_article', {
        title: "Add article"
    });
});

//submit post route
// everithing sending POST requests to /articles/add will be caught by this block of code
router.post('/add', (req, res) => {
    // the following validation code comes from express-validator
    // if notEmpty() returns false, the 'Title is required' error is returned
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Title is required').notEmpty();
    req.checkBody('body', 'Title is required').notEmpty();

    //get the errors
    let errors = req.validationErrors();
    if(errors) {
        res.render('add_article', {
            title: 'Add Article',
            errors: errors
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
    
        article.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        })
    }
});

// Load edit form
router.get('/edit/:id', (req, res) => {
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
router.post('/edit/:id', (req, res) => {
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
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    })
});


router.delete('/:id', (req, res) => {
    let query = {_id: req.params.id};

    Article.remove(query, (err) => {
        if(err) {
            console.log(err);
        }

        res.send('Success');
    });
});

// Get Single Article
// when catching /:placeholderName we should be careful because it will catch everything whose path mathes until the :
// and consider everything after the : as matching its path( /article/* is a match)
router.get('/:id', (req, res) => {
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

module.exports = router;