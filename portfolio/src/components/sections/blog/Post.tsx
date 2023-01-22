import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingSection} from "../LoadingSection";


import {BlogPostCard} from "./BlogPostCard";
import {Toolbar} from "../../utils/Toolbar";
import DeletePostButton from "./DeletePostButton";
import ColumnSlider from "../../utils/ColumnSlider";




export const Post=()=>{
    const {slug} = useParams();
    // console.log(slug);

    const [loading, setLoading] = useState(true)
    const [Post, setPost] = useState({
        id: '',
        _id:'',
        title: '',
        content: '',
        date: '',
        Icon: '',
    })
    const [AllPosts, setAllPosts] = useState()

    const token = localStorage.getItem('token')
    const getPost = async () => {
        if (token && slug) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('http://localhost:5000/api/blog/post/slug/'+slug)
                .catch(e => console.log('error', e))
            response && setPost(response.data)
            response && setLoading(false)
            const allPostResponse = await axios.get('http://localhost:5000/api/blog/posts/all')
                .catch(e => console.log('error', e))
            allPostResponse && setAllPosts(allPostResponse.data)
            return response
        }
        else console.log('no token')
    }

    useEffect(() => {
        loading && getPost().then(r => console.log('post', Post,r))
    })

    // @ts-ignore
    const sliderData = {totalItems: AllPosts?.length, user: JSON.parse(localStorage.getItem('user')), height: 'h-54'}
    const card =<div className={'flex justify-between flex-wrap w-screen h-full bg-amber-400 '}>

        <h1 className={'py-4 w-full'}>Blog</h1>
        <div  className={'w-3/5 py-4'}>
            <BlogPostCard size={'large'} post={Post}/>
            <div className={'flex gap-4 justify-end'}>
                <a href={'/blog/post/edit/'+Post._id}>Edit Post</a>
                <DeletePostButton postId={Post._id}/>
            </div>
        </div>

        <div className={' recent-posts w-2/5 -m-8'}>
            <h1 className={'w-full'}>Recent Posts</h1>
            <div className={'flex flex-col'}>
                <ColumnSlider data={sliderData}>
                    {/*@ts-ignore*/}
                    {AllPosts && AllPosts.map((post:any)=><BlogPostCard key={post.id} size={'small'} post={post}/>)}
                </ColumnSlider>
            </div>
        </div>
    </div>

    const tools=[{
        name: 'Edit Post',
        link: '/blog/post/edit/'+Post.id,
    }]

    return(
        <>
            <Toolbar tools={tools}/>
            {loading ? <LoadingSection/> : card}

            </>

    )


}
