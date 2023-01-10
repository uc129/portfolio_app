import mongoose from "mongoose";

const Schema= mongoose.Schema;




const PostSchema = new Schema({
    authorID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: String,
    description: String,
    content: String,
    date: { type: Date, default: Date.now },
    slug: String,
    hidden: Boolean,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    meta: {
        meta1: String,
        meta2: String,
    },
    categories: [String],
    tags: [String],
    likes: Number,
    dislikes: Number,
    views: Number,
    featured: Boolean,
    image: String,
    imageAlt: String,
    imageTitle: String,
    imageCaption: String,




})

const CommentSchema = new Schema({
    content: String,
    date: { type: Date, default: Date.now },

})

const CategorySchema = new Schema({
    name: String,
    slug: String,
    hidden: Boolean,
    date: { type: Date, default: Date.now },
    meta: {
        meta1: String,
        meta2: String,
    }

})






const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Category = mongoose.model('Category', CategorySchema);


export { Post, PostSchema, Comment, CommentSchema, Category, CategorySchema,};
