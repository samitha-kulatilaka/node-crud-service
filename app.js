const express = require('express');
const app = express();
const bodyPaser = require('body-parser');

const Post = require('./models/post.js');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

app.use(bodyPaser.json());


mongoose.connect("mongodb+srv://devzonedo:7rT2AtRR10iZzoI7@cluster0.qrgeuyp.mongodb.net/crudappdb?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("database connected successfully..");
})
.catch(()=>{
    console.log("error in database connection");
});




app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type , Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
});



app.use((req,res,next) => {
    console.log('this is from express');
    next();
});



app.post("/api/post" , (req,res,next)=>{
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


app.get('/api/posts',(req,res,next) => {
console.log('>> list all posts');

Post.find().then((document) => {
    console.log(document);

    res.status(200).json({
        message: "this post message",
        posts: document,
    });

});


});



app.get('/api/posts/:id',(req,res,next)=>{
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
app.put('/api/posts/:id',async (req,res,next)=>{
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
app.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    //https://mongoosejs.com/docs/api/query.html#Query.prototype.deleteOne()
    Post.deleteOne({ _id: req.params.id }).then((result) => {
      console.log(result);
      res.status(200).json({ message: "Post deleted" });
    });
  }); //delete



app.get("/healthcheck",(req,res,next)=>{
    console.log(">>/healthcheck");
    res.status(200).json({
        message: "server running ...... "
    });
});





module.exports = app;