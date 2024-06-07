const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyPaser = require('body-parser');

const Post = require('./models/post.js');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

app.use(bodyPaser.json());



// Secret key for signing JWT tokens
const secretKey = 'mysecret2024';



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


// Middleware for validating bearer token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token:'+token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log('user:'+user);
        req.user = user;
        next();
    });
}



app.use((req,res,next) => {
    console.log('this is from express');
    next();
});


// Authenticate user and generate token
app.post('/api/login', (req, res) => {
    // Authenticate user and generate token
    const username = req.body.username;
    const user = { username: username };

    const accessToken = jwt.sign(user, secretKey);
    res.json({ accessToken: accessToken });
});


//protected endpoint with jwt token autentication
app.get('/api/protected', authenticateToken, (req, res) => {
    console.log(req.user);
    res.json(req.user);
});

//protected endpoint with jwt token autentication
app.post('/api/home', authenticateToken, (req, res) => {
    console.log('-S-----------');
    console.log(req.user);
    console.log('-E-----------');

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    console.log(post);
    res.status(200).json({
        message:"post added successfully",
        post: post
    });

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



app.get('/api/posts',(req,res,next)=>{
    console.log("GET>>/api/posts");

    Post.find().then((document)=>{
        console.log(document);

        res.status(200).json({
            message:"list all posts",
            posts: document
        });

    }); 

});



app.get('/api/post/:id',(req,res,next)=>{
    console.log("GET>>/api/post/:id");
    const _id = req.params.id;
    console.log("_id:"+_id);

    const objId = new ObjectId(_id);

    Post.findById(objId).then( doc => {

        console.log('found:'+doc);
        
        res.status(200).json(doc);
    

    })
    .catch(err => {
        console.log(err);
    });

   
});



app.put('/api/posts/:id', async (req,res,next)=>{
console.log('PUT>>/api/posts/:id');
const postId = req.params.id;
console.log('_id:'+postId);
const { title , content } = req.body; 
console.log('title:'+title);
console.log('content:'+content);

const filter = { _id: new ObjectId(postId) };
const updateDoc = { title : title , content: content }


try{

const updatedDocument = await Post.findByIdAndUpdate(
    filter,
    updateDoc,
    {new:true}
);

res.status(200).json(updatedDocument);


}catch(err){
console.log('Error in update record:'+err);
return res.status(500).json({
    error : "Internal server error occur"
});
}

    res.status(200).json({
        message: "success"
    });

});



app.delete('/api/posts/:id', (req,res,next)=>{
    console.log("DELETE>>/api/posts/:id'");
    const _id = req.params.id;
    const filter = {_id: new ObjectId(_id)};
    
    Post.deleteOne(filter).then((result)=>{
    console.log(result);

    res.status(200).json({
        message: "Post deleted"
    });

    });

});






app.get("/healthcheck",(req,res,next)=>{
    console.log(">>/healthcheck");
    res.status(200).json({
        message: "server running ...... "
    });
});





module.exports = app;