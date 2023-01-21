


import {useEffect, useState} from "react";

import axios from "axios";

import {LoadingSection} from "../LoadingSection";
import RowCardSlider from "../../utils/RowCardSlider";

import {Toolbar} from "../../utils/Toolbar";
import {BlogPostCard} from "./BlogPostCard";


export const BlogSection = () => {

 let tools=[{name: 'Sign Up', link: '/blog/signup'}, {name: 'Log In', link: '/blog/login'},
            {name: 'Log Out', link: '/blog/logout'}, {name: 'New Post', link: '/blog/create-post'},
            {name: 'Manage Posts', link: '/blog/manage-posts'}]
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState(undefined as any)
    const [sliderData, setSliderData] = useState(undefined as any)

    const token = localStorage.getItem('token')

    // let refreshTime= 1000 * 10  // 10 seconds
    let refreshTime= 1000 * 4
    const [refresh, setRefresh] = useState(true)

    setInterval(() => {
        !Posts && setRefresh(!refresh)
    }, refreshTime)

useEffect( () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('token', token)
   refresh && axios.get('http://localhost:5000/api/blog/posts/all').then(r => r.data && setPosts(r.data)).catch(e => console.log('error', e))
    Posts && setSliderData
    ({totalItems: Posts? Posts?.length: 0,
        user: user? user: undefined,}
    )
    Posts && setLoading(false)
},[refresh])

    // @ts-ignore
    const user= JSON.parse(localStorage.getItem('user'))

    return (
        <>
            <Toolbar tools={tools}/>
        <div className={'px-6 w-[1224px] flex-col justify-center'}>
            <h1 className={'text-center'}>Blog Section</h1>
            {/*<div className={'flex py-6'}>*/}

            {loading ?<LoadingSection/>: <RowCardSlider data={sliderData}>
                {/*// @ts-ignore*/}
                {  Posts && Posts.map((post) => {
                    return <div className="blog-section row-end-2" key={post.title+post._id}>
                        <BlogPostCard size={'small'} post={post} key={post.id}/>
                    </div>
                })}
            </RowCardSlider>}
            {/*</div>*/}
        </div>
        </>
    )
}
