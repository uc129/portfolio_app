
export const BlogPostCard=({post,size}:any, )=>{

    const content = post.content;
    const smallContent = content && content.slice(0, 100);

    let small_card= document.getElementById('post-content-sm')
    let large_card= document.getElementById('post-content-lg')

    small_card&& (small_card.innerHTML = smallContent);
    large_card&& (large_card.innerHTML = content);

    if (size === 'small') {
        return <div className={'px-8'}>
            <h1>Blog Post Card</h1>
            <p>Date:</p> <p> {post.date}</p>
            <p>Title:</p> <p> {post.title}</p>
            <p> {post.Icon}</p>
            <p>Content:</p> <p id={'post-content-sm'}> </p>
            <a href={`/blog/${post.slug}`} > Read more... </a>

        </div>
    }

    if (size === 'large') {
        return (
            <div className={'px-8 bg-slate-500'}>
                <h1>Blog Post</h1>
                <p>Date:</p> <p> {post.date}</p>
                <p>Title:</p> <p> {post.title}</p>
                <div id={'post-content-lg'}></div>
                <p> {post.Icon} </p>
            </div>)
    }

    return <div> Describe Post card size </div>



}
