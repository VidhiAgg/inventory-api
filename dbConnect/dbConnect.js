const mongoose = require("mongoose");
//const mongoURI = process.env.MONGODB;
// console.log(process.env.MONGODB);
// console.log(mongoURI);



const intializeDBConnection = async () => {
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const dbURL =    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@neog.1tvoo8d.mongodb.net/?retryWrites=true&w=majority`;
    console.log(dbURL);
    try {
      const connect = await mongoose.connect(dbURL);
      console.log("Database connected successfully...");
    } catch (error) {
      console.error(error);
      process.exit();
    }
  };
  
  module.exports = { intializeDBConnection };