var dotenv=require('dotenv').config();
var http=require('http');
var url=require('url');
var mongoose=require('mongoose');
const route=require('./routes/routes');
var path = require('path');

// var sanatize=require('sanatize-caja');
var express=require('express');
app=express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
mongoose.Promise=global.Promise;

if(process.env.NODE_ENV!=='test'){
mongoose.connect('mongodb://localhost/');
}
//watch for incoming req to the route
//http://localhost:3050/api

route(app);


app.use((err, req, res, next)=>{

  res.status(422).send({err: err.message});



})
module.exports=app;
