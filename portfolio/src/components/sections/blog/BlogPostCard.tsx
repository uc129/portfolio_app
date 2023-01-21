
export const BlogPostCard=({post,size}:any, )=>{

    const content = post.content;
    const smallContent = content && content.slice(0, 100);

    let small_card= document.getElementById('post-content-sm')
    let large_card= document.getElementById('post-content-lg')

    small_card&& (small_card.innerHTML = smallContent);
    large_card&& (large_card.innerHTML = content);

    if (size === 'small') {
        return <div className={'px-8 w-max flex-col border-r max-h-52 h-52 border-black'}>
            <h1 className={'underline pb-4'}>Blog Post Card</h1>
            <p>
                <span className={'font-bold'} >Date:</span> <span> {post.date}</span>
            </p>

            <p>
                <span className={'font-bold'}>Title:</span> <span> {post.title}</span>
            </p>

            <p> {post.Icon}</p>
            <p>
                <span className={'font-bold'}>Content:</span> <span id={'post-content-sm'}> </span>
            </p>

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
