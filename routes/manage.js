var express = require('express');
var router = express.Router();

router.get('/articles', function (req, res, next) {
    res.render('manage-articles', {title: 'Manage Articles'});
});

module.exports = router;
