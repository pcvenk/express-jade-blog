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
    //enabling express validator. title refers to the input name
    req.checkBody('title', 'Title is required').notEmpty();
    //referencing errors into a variable
    var valErrors = req.validationErrors();

    if(valErrors){
        res.render('add-category', {
            //rendered in the add/category view. see add-category.jade file
            errors: valErrors,
            title: 'Add Category'
        });
    } else {
        //creating a new instance of the category object
        var category = new Category();
        category.title = req.body.title;
        category.description = req.body.description;

        Category.addCategory(category, function(err, doc){
            if(err){
                res.send(err);
            }else{
                //enabling flash messages
                req.flash('success', 'Category Saved');
                res.redirect('/manage/categories');
            }
        });
    }
});

module.exports = router;

