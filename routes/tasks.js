const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;

const {TaskModel,CategoryModel,getTasksWithCategory}= require('../models/task.js');

//create tasks by giving categoryId and other fields 
router.post("/add",(req,res,next)=>{
   console.log('task>>add'); 

   const task = new TaskModel({
        categoryObjectId: new ObjectId(req.body.category_id),
        title:req.body.title,
        content:req.body.content,
        userObjectId: new ObjectId(req.body.user_id),
   });

   task.save();

   res.status(200).json({
    message:"task created successfully"
   });

});


//create category 
router.get("/list",(req,res,next)=>{
    console.log('task>>list'); 

    // const tasksList = getTasksWithCategory();

    // res.status(200).json({
    //     message: "this list message",
    //     posts: tasksList,
    // });



    getTasksWithCategory().then((document) => {
        console.log(document);
    
        res.status(200).json({
            message: "this list message",
            posts: document,
        });

    });

    // TaskModel.find().then((document) => {
    //     console.log(document);
    
    //     res.status(200).json({
    //         message: "this list message",
    //         posts: document,
    //     });
    
    // });

       

});



//list tasks with category details 



//create task categories 
router.post("/category",async (req,res,next)=>{
    console.log("task>>category");

    console.log("categoryName:"+ req.body.name);

    const category = new CategoryModel({
        name: req.body.name
    });

    await category.save();

    res.status(200).json({
                message: "New category created successfully",
                posts: category,
            });


});


//get users task list
router.get("/list",(req,res,next)=>{
    console.log('task>>list'); 

    getTasksWithCategory().then((document) => {
        console.log(document);
    
        res.status(200).json({
            message: "this list message",
            posts: document,
        });

    });

});







module.exports = router;