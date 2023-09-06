const host='127.0.0.1';
const port = 40;
const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const mongoose = require("mongoose");
const bodyparsar = require ("body-parser",{UserNewUrlparsar:true});
mongoose.connect("mongodb+srv://nithin:nani@123@cluster0.faddelu.mongodb.net/portfolio?retryWrites=true&w=majority");


var details = new mongoose.Schema({
    Firstname:String,
    Lastname:String,
    Email:String,
    Subject:String,
    Messege:String
});

var Cdetails = mongoose.model("Cdetails",details);



app.use('/images',express.static('images'))
app.use('/views',express.static('views'))

app.use (express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../PORTFOLIO','/views','index.html'))
})

app.get('/About',(req,res)=>{
    res.sendFile(path.join(__dirname,'../PORTFOLIO','/views','About.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'../PORTFOLIO','/views','contact.html'))
})


app.get('/projects',(req,res)=>{
    res.sendFile(path.join(__dirname,'../PORTFOLIO','/views','project.html'))
})


app.post('/contact',(req,res)=>{
    var mydata = new Cdetails (req.body);
    mydata.save().then(()=>{
        // res.redirect('/contact')
        res.send("Item is saved")
    }).catch(()=>{
        res.status(400).send("Item is noy saved")
    });
})


app.listen(port,()=>{
    console.log(`the application is running on port ${port}`);
})
