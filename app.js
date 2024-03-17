const express = require('express');
const app = express();

app.use((req,res,next) => {
    console.log('this is from express');
});


module.exports = app;