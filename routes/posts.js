var express = require('express');
var router = express.Router();

var Post = require('../models/posts.js');
router.get('/',(req, res)=>{
    Post.find((err, posts)=>{
        if(err)
            res.send(err);
        res.json({data:posts, message:"Get list posts", status_code:200});
    })
});
router.post('/',(req,res)=>{
    var newPost = new Post(Object.assign({},req.body));

    newPost.save((err)=>{
        if(err)
            res.send(err);
        res.json({message:'Post created!', status_code:200});
    })
})
router.get('/:post_id',(req,res)=>{
    Post.findById(req.params.post_id,(err, post)=>{
        if(err)
            res.send(err);
        res.json({message:'Get a post!', data: post, status_code:200});
    })
})
router.put('/:post_id',(req,res)=>{
    Post.findByIdAndUpdate(req.params.post_id,Object.assign({},req.body),{new:true},(err, post)=>{
        if(err)
            res.send(err);
        res.json({message:'Post updated!', data: post, status_code:200});
    })
})
router.delete('/:post_id',(req,res)=>{
    Post.findByIdAndRemove(req.params.post_id,(err)=>{
        if(err)
            res.send(err);
        res.json({message:'Post deleted!', status_code:200});
    })
})
module.exports = router;