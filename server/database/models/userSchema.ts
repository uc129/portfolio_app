/** @format */

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true,message:'Please enter a name'},
  email: {type: String, unique: true, required: true,message:'Please enter a valid email address'},
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

const User = mongoose.model('User', userSchema);
export { User, userSchema };
