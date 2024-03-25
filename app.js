const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// return a promis to check the connection 
mongoose.connect("mongodb+srv://devzonedo:DhbKUXAQcxRtvTn9@cluster0.fo6xdw5.mongodb.net/mern-crud?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("connected to database!") ;
 })
 .catch(()=>{
     console.log("error in database connection") ;
 })
 ;

const Post = require('./models/post.js');


app.use(bodyParser.json()); // this of passing json data

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With , Content-Type , Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});



app.post("/api/posts",(req,res,next) => {
    console.log(">>/api/posts");
    
    const postx = req.body; 
    console.log(postx);

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    console.log(post);
    post.save();

    res.status(201).json({ //201 for new resource was created
        message: "Post added successfully",
    });

});


app.get("/healthcheck",(req,res,next) => {
    console.log(">>/healthcheck");
    res.status(200).json({
        message:"service running...."
    });
});


// app.use((req,res,next) => {
//     console.log('this is from express');
// });


module.exports = app;