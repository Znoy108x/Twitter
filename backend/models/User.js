const mongoose = require("mongoose")
const {Schema} = mongoose
const UserSchema = new Schema({
    Name : {
        type : String , 
        require : true,
        trim :  true
    },
    UserName : {
        type : String , 
        require : true,
        trim :  true,
        unique : true
    },
    Email : {
        type : String , 
        require : true,
        trim :  true
    },
    Password : {
        type : String , 
        require : true,
        trim :  true
    },
    Country : {
        type : String , 
        require : true,
        trim :  true
    } , 
    State : {
        type : String , 
        require : true,
        trim :  true
    } ,
    City : {
        type : String , 
        require : true,
        trim :  true
    } , 
    Following : {
        type : Array , 
        require : true,
        trim :  true
    } , 
    Followers : {
        type : Array , 
        require : true,
        trim :  true
    },
    Image : {
        type : String , 
        require : true,
        trim :  true
    },
    Banner : {
        type : String , 
        require : true,
        trim :  true
    },
    Bio : {
        type : String , 
        require : true,
        trim :  true
    },
    Joining : {
        type : String , 
        require : true,
        trim :  true
    } , 
    Goggle : {
        type : Boolean , 
        default : "false"
    },
    Apple : {
        type : Boolean , 
        default : "false"
    },
    LikedPosts : {
        type : Array , 
        default : []
    },
    BookMark : {
        type : Array , 
        default : []
    }
} , {timestamps : true})
module.exports = mongoose.model("User" , UserSchema)