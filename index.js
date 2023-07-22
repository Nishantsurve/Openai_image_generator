const path =require('path');
const express = require('express');
const dotenv =require('dotenv').config();

const port =process.env.PORT || 5000;

const app = express(); // object of express class 


// Enable body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/openai' ,require('./routes/openairoutes'));

app.get("/",(req,res) =>{
    res.send("Hi , I am Hosting");
});
app.listen(port, () =>{
    console.log(` Server started at the port ${port}`);
});
    
