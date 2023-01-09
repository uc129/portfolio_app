import {Post} from "../database/models/blog.model";
import jwt from "jsonwebtoken";

class BlogService {

  constructor() {

  }
  generateToken = async (id:any) => {
    return jwt.sign(id, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "30d",
    })
  }


   getAllPosts=async()=> {
    let allPosts;
    await Post.find().then((posts: any) => allPosts = posts);
     return allPosts;
  }
 getPostById= async (id: any)=> {
    let singlePost;
   await Post.findById(id).then((post: any) => singlePost = post);
    return singlePost
  }

   getPostsByUser= async(userId: any)=> {
    let postsByUser;
    await Post.find({ owner: userId }).then((posts: any) => postsByUser = posts);
    return postsByUser;
  }

  getPostsByCategory= async(categoryId: any)=> {
    let postsByCategory;
    await Post.find({ categories: categoryId }).then((posts: any) => postsByCategory = posts);
    return postsByCategory;
  }

  getPostsByTag= async(tag: string)=> {
    let postsByTag;
    await Post.find({ tags: tag }).then((posts: any) => postsByTag = posts);
    return postsByTag;
  }

  createPost= async(postData: any)=> {
    let newPost
    await Post.create(postData).then((post: any) => newPost = post);
    return newPost;
  }

   updatePost= async(id: any, postData: any)=> {
    let updatedPost;
    await Post.findByIdAndUpdate(id, postData).then((post: any) => updatedPost = post);
    return updatedPost;
  }


   deletePost= async(id: any)=> {
    let deletedPost;
    await Post.findByIdAndDelete(id).then((post: any) => deletedPost = post);
    return deletedPost;
  }


}

export default BlogService;
