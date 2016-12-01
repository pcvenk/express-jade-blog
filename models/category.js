var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({

    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }


});

var Category = module.exports = mongoose.model('Category', categorySchema);

//getCategories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title', 'ascending']])
};

//addCategories
module.exports.addCategory = function(category, callback){
  Category.create(category, callback);
};

//getCategory
module.exports.getCategoryById = function(id, callback){
  Category.findById(id, callback);
};