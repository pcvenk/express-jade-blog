var express = require('express');
var router = express.Router();

Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    Article.getArticles(function(err, articles){
       if(err){
           res.send(err);
       }else{
           res.render('index', {
               title: 'Express',
               articles: articles
           });
       }
    });
});



module.exports = router;

