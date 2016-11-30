var express = require('express');
var router = express.Router();

Category = require('../models/category');

router.get('/', function (req, res, next) {

    Category.getCategories(function(err, docs){
       if(err){
           console.log(err)
       }else{
           res.render('categories', {
               title: 'Categories',
               categories: docs
           });
       }
    });

});

module.exports = router;

