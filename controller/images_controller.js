
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
const imgur = require('../services/imgur');
 const searchTerm=require('../models/imageSearchList');
// const Search=require('bing.search');
// var util = require('util');
// var Bing = require('node-bing-api')({ 'Ocp-Apim-Subscription-Key': "25685a87-35ea-486c-b5c0-39a1b724d967" })

//
// var search = new Search('25685a87-35ea-486c-b5c0-39a1b724d967');
// var Flickr = require("flickrapi");
// flickrOptions = {
//       api_key: "e9aad107a91099fe77a684e82516c113",
//       secret: "a406bcf010489af7"
//     };
    // var flickr = new Flickr({
    //   api_key: "e9aad107a91099fe77a684e82516c113"
    // });

module.exports={

searchApi(req,res){
  let term= req.params.term,
  offset = req.query.offset || 10,
  timeStamp=Date.now();
  timeStamp=new Date(timeStamp*1000);
  let searchHistory=new searchTerm({term, timeStamp});
  searchHistory.save();
  imgur.getImage(term, offset)
  .then(ans => {
    res.json(ans);
  })
  // search.images(term,{top: offset}, (error, results) => {
  //   if (error) {
  //     res.status(500).json(error); // We return an error code
  //   } else {
  //     function createResults(image) {
  //       return {
  //         url: image.url,
  //         title: image.title,
  //         thumbnail: image.thumbnail.url,
  //         source: image.sourceUrl,
  //         type: image.type
  //       }
  //     }
  //     res.status(200).json(results.map(createResults)); // We return the results
  //   }
  // });
  // Bing.images("Ninja Turtles", {
  //   top: 15,   // Number of results (max 50)
  //   skip: 3    // Skip first 3 result
  //   }, function(error, res, body){
  //     console.log(body);
  //   });
  // search.web('Tutta Bella Neapolitan Pizzeria',{top: 5},function(err, results) {
  //     console.log(err);
  //   }
  // )

// var Flickr = require("flickrapi"),
// flickrOptions = {
//       api_key: "e9aad107a91099fe77a684e82516c113",
//       secret: "a406bcf010489af7",
//       OAuth:'947-670-680'
//     };
//
// Flickr.authenticate(flickrOptions, function(error, flickr) {
//   // we can now use "flickr" as our API object
//
//   flickr.photos.search({
//   text: "red+panda"
// }, function(err, result) {
//   if(err) { throw new Error(err); }
//   // do something with result
//   flickr.photos.search({
//   text: "red+panda"
// }, function(err, result) {
//   if(err) { throw new Error(err); }
//   // do something with result
//   console.log(err);
//    res.status(200).json(results.map(result));
// })
//
// })
//
// });


},
latest(req,res){
  searchTerm.find()
  .select({_id:0,term: 1, timeStamp: 1})
  .sort({timeStamp: 1})
  .limit(10)
  .then(results=>{
    res.status(200).json(results);
  })
}


}
