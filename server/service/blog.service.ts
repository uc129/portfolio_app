import {Post} from "../database/models/blog.model";

class BlogService {
   getAllPosts=async()=> {
    let allPosts;
        await Post.find().then((posts: any) => allPosts = posts);
     return allPosts;
  }
 getPostById= async (id: any)=> {
    let singlePost;
    id &&await Post.findById(id).then((post: any) => singlePost = post).catch((err: any) => console.log('Error getting post by id: ', err));
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

  getPostBySlug= async(slug: any)=> {
    let postBySlug;
    await Post.findOne({ slug: slug }).then((post: any) => postBySlug = post);
    return postBySlug;
  }

  getPostsByTag= async(tag: string)=> {
    let postsByTag;
    await Post.find({ tags: tag }).then((posts: any) => postsByTag = posts);
    return postsByTag;
  }

  createPost= async(postData: any)=> {
      //Each post requires a user id
    let newPost
      console.log('postData',postData)
        const {title,description, content, categories, tags, ownerID,slug} = postData;
        const newPostData = {
            title,
            description,
            content,
            categories,
            tags,
            authorID:ownerID,
            slug
        }
        try{
            postData && await Post.create(newPostData).then((post: any) => newPost = post);
        }
        catch (e) {
            console.log('Error creating post', e)
        }
        console.log('new post: ', newPost);
        return newPost;

  }

   updatePost= async(_id: any, postData: any)=> {
    let updatedPost;
    let {title} = postData;
       postData.slug=title.toLowerCase().replace(/ /g, '-');
    await Post.findByIdAndUpdate(_id, postData).then((post: any) => updatedPost = post);
    return updatedPost;
  }


   deletePost= async(id: any)=> {
    let deletedPost;
    await Post.findByIdAndDelete(id).then((post: any) => deletedPost = post);
    return deletedPost;
  }


}

export default BlogService;
