const mongoose = require("mongoose")
const connectToMongoose = () =>{
    mongoose.connect(`${process.env.MONGO_DB_URL}` , () =>{
        console.log(`Connected to the ${process.env.DB_NAME}`.rainbow)
    })
}
module.exports =  connectToMongoose
