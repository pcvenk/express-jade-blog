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
   res.render('article');
});

router.get('/category/:category_id', function(req, res, next){
   res.render('articles');
});

module.exports = router;

