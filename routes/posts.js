const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Post = require('../models/posts.js');

router.get('/',(req, res)=>{
  Post.find((err, posts)=>{
    if(err) return res.status(500).send(err);
    return res.json({data:posts, message:"Get list posts", status_code:200});
  });
});

router.post('/',(req,res)=>{
  const { error, value } = validateRequest(req);
  if(error) return res.status(422).json(getValidationError(error));

  const newPost = new Post(Object.assign({}, value));
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
  const { error, value } = validateRequest(req);
  if(error) return res.status(422).json(getValidationError(error));
  const updatedPost = Object.assign({ updated_at: Date.now() }, value);
  Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true }, (err, post) => {
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

const validateRequest = ({ body }) => {
  const schema = {
    body: Joi.string().required(),
    slug: Joi.string().required(),
    title: Joi.string().required(),
    hidden: Joi.boolean().truthy(["1", true]).falsy(["0", false]),
    featured: Joi.boolean().truthy(["1", true]).falsy(["0", false])
  };
  return Joi.validate(body, schema, { abortEarly: false, allowUnknown: true });
}

const getValidationError = ({ details }) => ({
  error: {
    errors: details.map(err => ({ label: err.context.label, message: err.message })),
    message: "Validation Error",
    status_code: 422
  }
});

module.exports = router;