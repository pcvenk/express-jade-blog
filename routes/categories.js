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

router.post('/add', function(req, res){
    //enabling express validator
    req.checkBody('title', 'Title is required').notEmpty();
    //referencing errors into a variable
    var valErrors = req.validationErrors();

    if(valErrors){
        res.render('add-category', {
            errors: valErrors,
            title: 'Add Category'
        });
    } else {
       res.send('Passed');
    }
});

module.exports = router;

