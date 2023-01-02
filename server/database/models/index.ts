import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

interface IModels {
    mongoose: typeof mongoose;
    user: mongoose.Model<mongoose.Document>;
    role: mongoose.Model<mongoose.Document>;
    ROLES: string[];
}

const db = {} as IModels;

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
