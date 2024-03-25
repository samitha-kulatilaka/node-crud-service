const express = require('express');
const app = express();
const bodyPaser = require('body-parser');

app.use(bodyPaser.json());

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
    const reqBody = req.body;
    console.log(reqBody);

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