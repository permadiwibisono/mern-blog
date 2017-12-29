var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostsSchema =  new Schema({
    author: String,
    title: { type:String, required:true, unique:true },
    slug: { type:String, required:true },
    body: { type:String, required:true },
    hidden: { type:Boolean, default:false },
    featured: { type:Boolean, default:false },
    created_at: { type:Date, default: Date.now },
    updated_at: { type:Date, default: Date.now }
})

module.exports =  mongoose.model('Post',PostsSchema);