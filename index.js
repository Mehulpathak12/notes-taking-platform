const { log } = require('console');
const exp = require('constants');
const express = require('express');
const fs =  require('fs');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get("/",function(req,res){
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files});
    })
})
app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("show",{filename: req.params.filename,filedata: filedata});
    })
})
app.get("/remove/:filename",function(req,res){
    const filename = req.params.filename;
    const filePath = path.join(__dirname,"files", filename);
    console.log(filePath);
    fs.unlink(filePath,(err)=>{
        res.redirect("/");
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/")});
})
app.listen(3000);