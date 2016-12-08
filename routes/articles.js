var express = require('express');
var router = express.Router();

Article = require('../models/article.js');

router.get('/', function (req, res, next) {
    Article.getArticles(function(err, articles){
       if(err){
           res.send(err);
       }else{
           res.render('articles', {
               title: 'All articles',
               articles: articles
           });
       }
    });
});

router.get('/show/:id', function(req, res, next){
   Article.getArticleById([req.params.id], function(err, doc){
      if(err){
          res.send(err);
      }else{
          res.render('article', {
              article: doc
          });
      }
   });
});

router.get('/show/:id/comment', function(req, res){

    Article.getArticleById([req.params.id], function(err, article){
        if(err){
            res.send(err);
        }else{
            res.render('add-comment', {
                title: 'Add Comment',
                article: article
            });
        }
    });
});

router.post('/add', function(req, res){
    //enabling express validator. title refers to the input name
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();

    //referencing errors into a variable
    var valErrors = req.validationErrors();

    if(valErrors){
        Category.getCategories(function(err, docs){

            res.render('add-article', {
                //rendered in the add/article view. see add-article.jade file
                errors: valErrors,
                title: 'Add Article',
                categories: docs
            });
        });

    } else {
        //creating a new instance of the article object
        var article = new Article();
        article.title = req.body.title;
        article.subtitle = req.body.subtitle;
        article.category = req.body.category;
        article.body = req.body.body;
        article.author = req.body.author;

        Article.addArticle(article, function(err, doc){
            if(err){
                res.send(err);
            }else{
                //enabling flash messages
                req.flash('success', 'Article Saved');
                res.redirect('/manage/articles');
            }
        });
    }
});

router.post('/edit/:id', function(req, res, next){
    // Validation Rules
    req.checkBody('title','Title field is required').notEmpty();
    req.checkBody('author','Author field is required').notEmpty();
    req.checkBody('category','Category field is required').notEmpty();

    // Check Errors
    var errors = req.validationErrors();

    if(errors){
        res.render('edit_article',{
            "errors": errors,
            "title": req.body.title,
            "subtitle": req.body.subtitle,
            "body": req.body.body,
            "author": req.body.author,
            "category": req.body.category
        });
    } else {
        var article = new Article();
        var query = {_id:[req.params.id]};
        var update = {
            title:req.body.title,
            subtitle:req.body.subtitle,
            category:req.body.category,
            author:req.body.author
        };

        Article.updateArticle(query, update, {}, function(err, article){
            if(err){
                res.send('Error: '+err);
            } else {
                req.flash('success','Article Updated');
                res.location('/manage/articles');
                res.redirect('/manage/articles');
            }
        });
    }
});

router.delete('/delete/:id', function(req, res){
    var query = {_id: [req.params.id]};
    Article.remove(query, function(err){
        if(err){
            res.send(err);
        } else {
            res.status(204).send();
        }
    });
});



router.get('/category/:category_id', function(req, res, next){

    Article.getArticles({category:req.params.category_id}, function(err, articles){
        if(err){
            res.send(err);
        }else{
            Category.getCategoryById(req.params.category_id, function(err, category){
                res.render('article-by-category',{
                    title: 'category.title',
                    articles: articles
                });
            });
        }
    });
});


module.exports = router;

