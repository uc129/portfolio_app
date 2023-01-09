import BlogService from "../service/blog.service";

const router = require('express').Router();
const service = new BlogService()


router.post('/new/create-post', async (req: any, res: any) => {
    const formData = req.fields.data;
    let newPost;
    !formData && console.log('Error receiving form data');
    !formData && res.send('Error receiving form data');
    await service.createPost(formData).then((post: any) => newPost = post);
    console.log('new post: ', newPost);
    newPost ? res.send('Post Created') : res.send('Post not created');
})

router.get('/posts/all', async (req: any, res: any) => {
    let allPosts;
    await service.getAllPosts().then((posts: any) => allPosts = posts);
    console.log('all posts: ', allPosts);
    allPosts ? res.send(allPosts) : res.send('Error getting posts');
})

router.get('/post/single/:id', async (req: any, res: any) => {
    const {id} = req.params;
    let singlePost;
    await service.getPostById(id).then((post: any) => singlePost = post);
    console.log('single post : ', id, ': ', singlePost);
    singlePost ? res.send(singlePost) : res.send('Error getting post');
})

router.get('/post/user/:id', async (req: any, res: any) => {
    const {id} = req.params;
    let postsByUser;
    await service.getPostsByUser(id).then((posts: any) => postsByUser = posts);
    console.log('post by user: ', id, ': ', postsByUser);
    postsByUser ? res.send(postsByUser) : res.send('Error getting posts');

})

router.get('/post/category/:id', async (req: any, res: any) => {
    const {id} = req.params;
    let postsByCategory;
    await service.getPostsByCategory(id).then((posts: any) => postsByCategory = posts);
    console.log('posts by category: ', postsByCategory);
    postsByCategory ? res.send(postsByCategory) : res.send('Error getting posts');
})

router.get('/post/tag/:tag', async (req: any, res: any) => {
    const {tag} = req.params;
    let postsByTag;
    await service.getPostsByTag(tag).then((posts: any) => postsByTag = posts);
    console.log('posts by tag: ', postsByTag);
    postsByTag ? res.send(postsByTag) : res.send('Error getting posts');
})

router.put('/post/update/:id', async (req: any, res: any) => {
    const {id} = req.params;
    const formData = req.fields.data;
    let updatedPost;
    !formData && console.log('Error receiving form data');
    !formData && res.send('Error receiving form data');
    await service.updatePost(id, formData).then((post: any) => updatedPost = post);
    console.log('updated post: ', updatedPost);
    updatedPost ? res.send(updatedPost) : res.send('Error updating post');
})


router.delete('/post/delete/:id', async (req: any, res: any) => {
    const {id} = req.params;
    let deletedPost;
    await service.deletePost(id).then((post: any) => deletedPost = post);
    console.log('deleted post: ', deletedPost);
    deletedPost ? res.send(deletedPost) : res.send('Error deleting post');
})

module.exports = router;
export {}




