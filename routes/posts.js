var express = require('express');
var router = express.Router();

var Post = require('../models/posts.js');
router.get('/',(req, res)=>{
    Post.find((err, posts)=>{
        if(err)
            res.send(err);
        res.json({data:posts, status_code:200});
    })
})
module.exports = router;