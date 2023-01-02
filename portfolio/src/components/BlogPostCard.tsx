
export const BlogPostCard=({post,size}:any, )=>{

    if (size === 'small') {
        return <div className={'px-8'}>
            <h1>Blog Post Card</h1>
            <p>Date:</p> <p> {post.date}</p>
            <p>Title:</p> <p> {post.date}</p>
            <p> {post.Icon}</p>
            <p>Content:</p> <p> {post.content}</p>
            <a href={`/blog/${post.slug}`} > Read more... </a>

        </div>
    }

    if (size === 'large') {
        return (
            <div className={'px-8 w-4/6 bg-slate-500'}>
                <h1>Blog Post</h1>
                <p>Date:</p> <p> {post.date}</p>
                <p>Title:</p> <p> {post.date}</p>
                <p> {post.Icon}</p>
            </div>)
    }

    return <div> Describe Post card size </div>



}
