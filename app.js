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



var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/app-dev';
var mongoOptions = {db: {safe: true}};
var port = process.env.PORT || 3000;
var baseUrl = process.env.BASE_URL || ('http://localhost:' + port + '/');
var urlConnection="mongodb://heroku_h6nlzr0c:6n34j5qsf8mco209tral810ke6@ds163940.mlab.com:63940/heroku_h6nlzr0c";


mongoose.connect(urlConnection);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
app.listen(port,()=>{
  console.log('Running ');

})
// app.listen(8080, ()=>{
// console.log('Running on port 8080');
//
// });
route(app);


app.use((err, req, res, next)=>{

  res.status(422).send({err: err.message});



})
module.exports=app;
