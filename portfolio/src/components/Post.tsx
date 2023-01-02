import {Posts} from "../data/BlogData";
import {BlogPostCard} from "./BlogPostCard";
import {useParams} from "react-router-dom";

export const Post=()=>{
    const {slug} = useParams();
    console.log(slug);
    const post = Posts.find((post)=>post.slug === slug);

    return(
        <>
        <div className={'grid grid-rows-2 grid-cols-8 w-screen '}>
            <h1 className={'row-end-1 col-start-4 col-end-5 py-4'}>Blog</h1>
            <div  className={'row-end-2 col-start-1 col-end-4 py-4'}>
                <h1>{post?.title}</h1>
                <p>{post?.date}</p>
                <p>{post?.Icon}</p>
                <p>{post?.content}</p>
            </div>

                <div className={' row-end-2 col-start-7 col-end-8 recent-posts w-1/4 -m-8'}>
                    <h1>Recent Posts</h1>
                    <div className={'flex flex-col'}>
                        {Posts.map((post)=>{
                            return <BlogPostCard post={post} size={'small'} key={post.id}/>
                        })}
                    </div>
                </div>
        </div>
            </>

    )


}
