var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({

    title: String,
    subtitle: String,
    category: String,
    body: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [{

        commentSubject: String,
        commentBody: String,
        commentAuthor: String,
        commentEmail: String,
        commentDate : String
    }]

});

var Article = module.exports = mongoose.model('Article', articleSchema);

//getArticles
module.exports.getArticles = function(query, callback, limit){
    Article.find(query, callback).limit(limit);
};

//addArticles
module.exports.addArticle = function(article, callback){
    Article.create(article, callback);
};

//getArticle
module.exports.getArticleById = function(id, callback){
    Article.findById(id, callback);
};

// Update Article
module.exports.updateArticle = function(query, update, options, callback){
    Article.findOneAndUpdate(query, update, options, callback);
};