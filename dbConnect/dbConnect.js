const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB;
console.log(process.env.MONGODB);
console.log(mongoURI);
const intializeDBConnection = async()=>{
    try {
        mongoose.connect(mongoURI).then(()=>{
            console.log("Connected to MongoDb.");
        }).catch(error => {
            console.error("Error connecting the Mongodb", error);
        })
    } catch (error) {
        console.error("Error connecting tp MongoDb: ", error);
    }
}

module.exports = {intializeDBConnection}