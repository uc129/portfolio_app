import mongoose from "mongoose";
const dotenv = require("dotenv")
dotenv.config()

let dbConfig = {
    URL:process.env.MONGO_URI as string,
    // URL:'mongodb://docker:mongopw@localhost:55000',
    DB:'uc129',
};
console.log('dbConfig: ', dbConfig);
export const connectDB = () => {
    mongoose.set('strictQuery', true)
    mongoose
        .connect(dbConfig.URL,
            (err: any) => {
            console.error("Connection error", err);
            !err && console.log("Connected to MongoDB");
            })
}





