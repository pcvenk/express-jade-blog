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

router.get('/category/:category_id', function(req, res, next){
   res.render('articles');
});

module.exports = router;

