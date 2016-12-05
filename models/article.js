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