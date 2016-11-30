var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({

    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }


});

var Category = exports.module = mongoose.model('Category', categorySchema);

//getCategories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title', 'ascending']])
};