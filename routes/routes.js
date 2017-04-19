const imageController=require('../controller/images_controller');
 module.exports=((app)=>{
   /* GET home page. */
   app.get('/', function(req, res, next) {
     res.render('index');
   });
   app.get('/imagesearch/:term',imageController.searchApi);
   app.get('/latest',imageController.latest);

 })
