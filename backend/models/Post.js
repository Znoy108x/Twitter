const mongoose = require("mongoose")
const {Schema} = mongoose
const PostSchema = new Schema({
    User : {
      type : mongoose.Schema.Types.ObjectId , 
      ref : 'User' , 
      required : true
    },
    Description : {
        type : String ,
        required : true
    },
    Image : {
        type : String 
    } ,
    Video : {
        type : String
    },
    Tags : {
        type : Array , 
        required : true
    } ,
    Likes :{
        type : Number ,
        default : 0
    }
},{timestamps : true})
module.exports = mongoose.model("Post", PostSchema)