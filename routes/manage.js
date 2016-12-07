var express = require('express');
var router = express.Router();

Category = require('../models/category');
Article = require('../models/article');

router.get('/articles', function (req, res, next) {

    Article.getArticles(function(err, docs){
       if(err){
           res.send(err);
       }else{
           res.render('manage-articles', {
               title: 'Manage Articles',
               articles: docs
           });
       }
    });
});

router.get('/categories', function (req, res, next) {

    Category.getCategories(function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.render('manage-categories', {
                title: 'Manage Categories',
                categories: docs
            });
        }
    });
});

router.get('/articles/add', function(req, res, next){

    Category.getCategories(function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.render('add-article', {
                title: 'Add Article',
                categories: docs
            });
        }
    });
});

router.get('/categories/add', function(req, res, next){
   res.render('add-category', {title: 'Add Category'})
});

router.get('/articles/edit/:id', function(req, res, next){

    Category.getCategories(function(err, docs){
       if(err){
           res.send(err);
       }else{
           res.render('edit-article', {
               title: 'Edit Article',
               categories: docs
           });
       }
    });

    Article.getArticleById([req.params.id], function(err, doc){

        if(err){
            res.send(err);
        }else{
            res.render('edit-article', {
                title: 'Edit Article',
                article: doc
            });
        }
    });
});

router.get('/categories/edit/:id', function(req, res, next){

    Category.getCategoryById([req.params.id], function(err, category){
        if(err){
            res.send(err);
        }else{
            res.render('edit-category', {
                title: 'Edit Category',
                category: category
            });
        }
    });
});

module.exports = router;
