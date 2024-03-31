const mongoose = require('mongoose');

// this is schema blue print 
const postSchema = mongoose.Schema({
    title: { type: String , require: true },
    content: { type: String , require: true }
});


module.exports = mongoose.model('Post' , postSchema);