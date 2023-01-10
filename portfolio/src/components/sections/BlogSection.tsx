import {BlogPostCard} from "../BlogPostCard";

import {Toolbar} from "../Toolbar";
import {useEffect, useState} from "react";

import axios from "axios";
import {Loading} from "./Loading";

export const BlogSection = () => {

 let tools=[{name: 'Sign Up', link: '/blog/sign-up'}, {name: 'Log In', link: '/blog/log-in'},
            {name: 'Log Out', link: '/blog/log-out'}, {name: 'New Post', link: '/blog/create-post'},
            {name: 'Manage Posts', link: '/blog/manage-posts'}]
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState()

    const token = localStorage.getItem('token')
    const getPosts = async () => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('http://localhost:5000/api/blog/posts/all')
                .catch(e => console.log('error', e))
            response && setPosts(response.data)
            response && setLoading(false)
            return response
        }
        else console.log('no token')
 }


useEffect(() => {
    getPosts().then(r => console.log('posts', Posts, r))
},[])






    return (
        <>
            <Toolbar tools={tools}/>
        <div className={'px-6 w-[1224px] flex-col justify-center'}>
            <h1 className={'text-center'}>Blog Section</h1>
            <div className={'flex py-6'}>
                {/*// @ts-ignore*/}
                { loading ?<Loading/>:Posts && Posts.map((post) => {
                    // @ts-ignore
                    return <div className="blog-section row-end-2" key={post.title}>
                        {/*// @ts-ignore*/}
                        <BlogPostCard size={'small'} post={post} key={post.id}/>
                    </div>
                })}

            </div>
        </div>
        </>
    )
}
