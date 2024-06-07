const express = require('express');

const Post = require('../models/post.js');
const User = require('../models/user.js');
const {TaskModel,CategoryModel,getUserTaskList}= require('../models/task.js');

const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

// this is async function it await for the save result from mongodb
router.post("/register",async (req,res,next)=>{
   console.log("users>>register");

   try {
   const user = new User({
        email: req.body.email,
        username: req.body.username, 
        password: req.body.password
    });

    console.log(user);
    await user.save();

    // const task = new TaskModel({
    //     categoryObjectId: category._id,
    //     title:'My title',
    //     content: 'my content'
    // });

    // task.save();

    res.status(200).json({
       message:"user registration successfully"
    });


    } catch (error) {
        // Code to handle the error
        console.error('An error occurred:', error);
        res.status(200).json({
            message:"Unable to create user, invalid input found"
         });
    }

});



//loging with username and password
router.post("/login",async (req,res,next)=>{
    console.log('user>>login');

    //find by username and password
    const { username, password } = req.body;

   
    try{

    // Search for a user with the provided username and password
    const user = await User.findOne({ username, password });

    if(user){
        res.status(200).json({
            message: "Login successful",
            user: user
        });
    }else{
        // User not found, send a failure response
        res.status(401).json({
            message: "Invalid username or password"
        });
    }

    } catch (error) {
        // Handle any errors
        console.error('An error occurred:', error);

        res.status(500).json({
            message: "Internal server error"
        });
    }



});


//get perticuler users task
router.get("/task",async (req,res,next)=>{
    console.log("users>>task");

   //new ObjectId(req.params.id);

   const userid = req.headers['userid'];
   console.log("userid:"+userid);

    const taskList = await getUserTaskList(new ObjectId(userid));

    res.status(200).json({
        message: "Tasks list",
        data: taskList
    });

});


module.exports = router;