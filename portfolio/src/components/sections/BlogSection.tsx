import {BlogPostCard} from "../BlogPostCard";
import {Posts} from "../../data/BlogData";
import {useEffect} from "react";

export const BlogSection = ({options}: any) => {

    useEffect(() => {
        options([{name: 'Sign Up', link: '/blog/sign-up'}, {name: 'Log In', link: '/blog/log-in'},
            {name: 'Log Out', link: '/blog/log-out'}, {name: 'New Post', link: '/blog/create-post'},
            {name: 'Manage Posts', link: '/blog/manage-posts'}])
    }, [])


    return (<div className={'px-6 w-[1224px] flex-col justify-center'}>
            <h1 className={'text-center'}>Blog Section</h1>
            <div className={'flex py-6'}>
                {Posts.map((post) => {
                    return <div className="blog-section row-end-2" key={post.title}>
                        <BlogPostCard size={'small'} post={post} key={post.id}/>
                    </div>
                })}

            </div>
        </div>)
}
