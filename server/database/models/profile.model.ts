import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    image: {
        type: String,
    }

})

const Profile = mongoose.model('profile', ProfileSchema);
export { Profile, ProfileSchema };
