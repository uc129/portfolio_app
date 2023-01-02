const db = require("./models/index");
const Role = db.role;

let dbConfig = {
    URL:'mongodb://docker:mongopw@localhost:55001',
    HOST:'localhost',
    PORT:'55001',
    DB:''
};

export const connectDB = async () => {
    db.mongoose.set('strictQuery', true)
    db.mongoose
        .connect(dbConfig.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            (err: any) => {
            console.error("Connection error", err);
            process.exit()})
    initial()

    function initial() {
        Role.estimatedDocumentCount((err: any, count: number) => {
            if (!err && count === 0) {
                new Role({
                    name: "user"
                }).save();

                new Role({
                    name: "moderator"
                }).save();

                new Role({
                    name: "admin"
                }).save();
            }

            if (err) {
                console.log("error", err);
            }
        });
    }

}





