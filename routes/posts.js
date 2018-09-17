const express = require('express');
const router = express.Router();

const Post = require('../models/posts.js');

router.get('/',(req, res)=>{
  Post.find((err, posts)=>{
    if(err) return res.status(500).send(err);
    return res.json({data:posts, message:"Get list posts", status_code:200});
  });
});

router.post('/',(req,res)=>{
  const newPost = new Post(Object.assign({},req.body));
  newPost.save((err)=>{
    if(err) return res.status(500).send(err);
    return res.json({message:'Post created!', status_code:200});
  });
});

router.get('/:id',(req,res)=>{
  Post.findById(req.params.id,(err, post)=>{
    if(err) return res.status(500).send(err);
    return res.json({message:'Get a post!', data: post, status_code:200});
  })
})

router.put('/:id',(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,Object.assign({updated_at:Date.now()},req.body),{new:true},(err, post)=>{
    if(err) return res.status(500).send(err);
    return res.json({message:'Post updated!', data: post, status_code:200});
  });
});

router.delete('/:id',(req,res)=>{
  Post.findByIdAndRemove(req.params.id,(err)=>{
    if(err) return res.status(500).send(err);
    return res.json({message:'Post deleted!', status_code:200});
  });
});
module.exports = router;