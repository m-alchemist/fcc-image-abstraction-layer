mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema=mongoose.Schema;

//creating point schema

const searchTermSchema= new Schema({
  term: {
    type: String,
    required: 'true'
  },
  timeStamp: {
    type: Date,
    required: 'true'
  }
});
searchTermSchema.index({timeStamp: 1});
const searchTerm=mongoose.model('searchTerm', searchTermSchema);
module.exports=searchTerm;
