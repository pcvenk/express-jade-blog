var express = require('express');
var router = express.Router();

Category = require('../models/category');

router.get('/articles', function (req, res, next) {
    res.render('manage-articles', {title: 'Manage Articles'});
});

router.get('/categories', function (req, res, next) {

    Category.getCategories(function(err, docs){
        if(err){
            console.log(err)
        }else{
            res.render('manage-categories', {
                title: 'Manage Categories',
                categories: docs
            });
        }
    });
});

router.get('/articles/add', function(req, res, next){
   res.render('add-article', {title: 'Add Article'})
});

router.get('/categories/add', function(req, res, next){
   res.render('add-category', {title: 'Add Category'})
});

router.get('/articles/edit/:id', function(req, res, next){
    res.render('edit-article', {title: 'Edit Article'})
});

router.get('/categories/edit/:id', function(req, res, next){
    res.render('edit-category', {title: 'Edit Category'})
});

module.exports = router;
