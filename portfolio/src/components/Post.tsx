// import {Posts} from "../data/BlogData";
import {BlogPostCard} from "./BlogPostCard";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Toolbar} from "./Toolbar";
import {Loading} from "./sections/Loading";

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
    },[])

    const card =<div className={'grid grid-rows-2 grid-cols-8 w-screen '}>
        <h1 className={'row-end-1 col-start-4 col-end-5 py-4'}>Blog</h1>
        <div  className={'row-end-2 col-start-1 col-end-4 py-4'}>
            <h1>{Post?.title}</h1>
            <p>{Post?.date}</p>
            <p>{Post?.Icon}</p>
            <p>{Post?.content}</p>
        </div>

        <div className={' row-end-2 col-start-7 col-end-8 recent-posts w-1/4 -m-8'}>
            <h1>Recent Posts</h1>
            <div className={'flex flex-col'}>
                <BlogPostCard post={Post} size={'large'} key={Post.id}/>
            </div>
        </div>
    </div>

    return(
        <>
            <Toolbar/>
            {loading ? <Loading/> : card}
            </>

    )


}
