var express = require('express');
var router = express.Router();

router.get('/articles', function (req, res, next) {
    res.render('manage-articles', {title: 'Manage Articles'});
});

router.get('/categories', function (req, res, next) {
    res.render('manage-categories', {title: 'Manage Categories'});
});

router.get('/articles/add', function(req, res, next){
   res.render('add-article', {title: 'Add Article'})
});

router.get('/categories/add', function(req, res, next){
   res.render('add-category', {title: 'Add Category'})
});

module.exports = router;
