const express = require('express');

const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const Post = require('../models/post.js');

// /api/post
router.post("/" , (req,res,next)=>{
    console.log(">>/api/post");
    //const reqBody = req.body;

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    console.log(post);
    post.save();

    res.status(200).json({
        message:"post added successfully"
    });
});



// /api/posts
router.get('/',(req,res,next) => {
    console.log('>> list all posts');
    
    Post.find().then((document) => {
        console.log(document);
    
        res.status(200).json({
            message: "this post message",
            posts: document,
        });
    
    });
    
    
    });



// /api/posts/:id
    router.get('/:id',(req,res,next)=>{
        console.log(">> '/api/posts/:id "); 
        const _id = req.params.id;
        console.log('_id:'+ _id);
        
        Post.findById(new ObjectId(_id))
        .then(doc => {
            console.log('found:'+doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
        });
        
        });





        // update by id
        // /api/posts/:id
 router.put('/:id',async (req,res,next)=>{
    console.log(">>PUT '/api/post/:id"); 
    console.log(req.params.id);
    const postId = req.params.id;
    const { title, content } = req.body;

    const filter = { _id: new ObjectId(postId) }; // find the object 
    const updateDoc = { title: title , content: content }; // creating to be update object
    console.log("content:"+content);

    try{

        const updatedPost = await Post.findByIdAndUpdate(
            filter,
            updateDoc,
            {new: true}  // return updated document
          );

          return res.json(updatedPost);

    }catch(err){
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    
});




//delete 
// /api/posts/:id
router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    //https://mongoosejs.com/docs/api/query.html#Query.prototype.deleteOne()
    Post.deleteOne({ _id: req.params.id }).then((result) => {
      console.log(result);
      res.status(200).json({ message: "Post deleted" });
    });
  }); //delete





module.exports = router;