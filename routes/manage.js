var express = require('express');
var router = express.Router();

router.get('/articles', function (req, res, next) {
    res.render('manage-articles', {title: 'Manage Articles'});
});

router.get('/categories', function (req, res, next) {
    res.render('manage-categories', {title: 'Manage Categories'});
});

module.exports = router;
