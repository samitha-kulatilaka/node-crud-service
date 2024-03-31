const express = require('express');
const app = express();
const bodyPaser = require('body-parser');

const Post = require('./models/post.js');

const mongoose = require('mongoose');

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



app.get("/healthcheck",(req,res,next)=>{
    console.log(">>/healthcheck");
    res.status(200).json({
        message: "server running ...... "
    });
});





module.exports = app;