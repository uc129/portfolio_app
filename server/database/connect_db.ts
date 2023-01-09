import mongoose from "mongoose";


let dbConfig = {
    URL:'mongodb+srv://uc129:mongo@cluster0.fvxgr2p.mongodb.net/?retryWrites=true&w=majority',
    // URL:'mongodb://docker:mongopw@localhost:55000',
    DB:'uc129',
};

export const connectDB = () => {
    mongoose.set('strictQuery', true)
    mongoose
        .connect(dbConfig.URL,
            (err: any) => {
            console.error("Connection error", err);
            !err && console.log("Connected to MongoDB");
            })
}





