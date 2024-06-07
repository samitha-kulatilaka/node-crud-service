const mongoose = require('mongoose');

//task category
const categorySchema = new mongoose.Schema({
    // Properties of the referenced object
    name: String,
    // Other properties...
});


// this is schema blue print 
const taskSchema = mongoose.Schema({

    categoryObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // 'Referenced' should match the model name registered for CategorySchema
        required: true
    },
    userObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 'Referenced' should match the model name registered for UserSchema
        required: true
    },
    title: { type: String , require: true },
    content: { type: String , require: true }

});


// Create models
const CategoryModel = mongoose.model('Category', categorySchema);
const TaskModel = mongoose.model('Task', taskSchema);


// Function to get tasks with category details
async function getTasksWithCategory() {
    try {
        console.log('executing.....start');
        const tasks = await TaskModel.find().populate('categoryObjectId');
        console.log('executing.....end'+tasks);
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks with category details:', error);
        throw error;
    }
}


async function getUserTaskList(userId){
    try {
        console.log('executing.....start');
        const tasks = await TaskModel.find({ "userObjectId": userId }).populate('categoryObjectId').populate('userObjectId');
        console.log('executing.....end'+tasks);
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks with category details:', error);
        throw error;
    }
}


module.exports = {
    CategoryModel,
    TaskModel,
    getTasksWithCategory,
    getUserTaskList
};