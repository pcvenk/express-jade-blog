var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/show/:id', function(req, res, next){
   res.render('article');
});

module.exports = router;

