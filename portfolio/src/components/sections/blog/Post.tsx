import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingSection} from "../LoadingSection";

import {Toolbar} from "../../Toolbar";
import {BlogPostCard} from "./BlogPostCard";




export const Post=()=>{
    const {slug} = useParams();
    console.log(slug);

    const [loading, setLoading] = useState(true)
    const [Post, setPost] = useState({
        id: '',
        title: '',
        content: '',
        date: '',
        Icon: '',
    })

    const token = localStorage.getItem('token')
    const getPost = async () => {
        if (token && slug) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('http://localhost:5000/api/blog/post/slug/'+slug)
                .catch(e => console.log('error', e))
            response && setPost(response.data)
            response && setLoading(false)
            return response
        }
        else console.log('no token')
    }

    useEffect(() => {
        getPost().then(r => console.log('post', Post,r))
    })

    const card =<div className={'grid grid-rows-2 grid-cols-8 w-screen h-full bg-amber-400 '}>
        <h1 className={'row-end-1 col-start-4 col-end-5 py-4'}>Blog</h1>
        <div  className={'row-end-2 col-start-1 col-end-4 py-4'}>
            <BlogPostCard size={'large'} post={Post}/>
        </div>

        <div className={' row-end-2 col-start-7 col-end-8 recent-posts w-1/4 -m-8'}>
            <h1>Recent Posts</h1>
            <div className={'flex flex-col'}>
                <BlogPostCard post={Post} size={'small'} key={Post.id}/>
            </div>
        </div>
    </div>

    const tools=[{
        'name': 'Edit Post',
        'link': '/blog/post/edit/'+Post.id,
    }]

    return(
        <>
            <Toolbar tools={tools}/>
            {loading ? <LoadingSection/> : card}
            </>

    )


}
