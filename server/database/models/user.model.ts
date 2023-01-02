/** @format */

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userModel = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  profession: String,
  profilePic: String,
  hidden: Boolean,
  date: { type: Date, default: Date.now },
  meta: {
    meta1: String,
    meta2: String,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

const User = mongoose.model('User', userModel);
export { User, userModel };
