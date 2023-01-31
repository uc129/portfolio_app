import Auth1Context, {Auth1ContextType} from "../../../context/Auth1Context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import DeletePostButton from "./DeletePostButton";
import ColumnSlider from "../../utils/ColumnSlider";
import {Toolbar, ToolbarTool} from "../../utils/Toolbar";
import SetFeaturedPostButton from "./SetFeaturedPostButton";

const ManagePosts = () => {

    const context = useContext(Auth1Context);
    const {isAuthenticated, user}: Auth1ContextType = context;
    const [Posts, setPosts] = useState([] as any[])
    const [showButtons, setShowButtons] = useState(true)


    useEffect(() => {
        try {
            if (isAuthenticated) {
                const token = localStorage.getItem('token')
                token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
                // @ts-ignore
                user && axios.get(`http://localhost:5000/api/blog/posts/user/${user.id}`).then(r => {
                    setPosts(r.data)
                })
            } else {
                console.log('not authenticated')

            }
        } catch (e: any) {
            console.log('error', e)

        }
    }, [isAuthenticated, user]);//use effect end

    const sliderData = {
        // @ts-ignore
        totalItems: Posts?.length, // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')), height: 'h-96'
    }

    const tools:ToolbarTool[]=[

        {
            name:'Blog',
            link:'/blog',
            auth:false
        },
        {
            name:'New Post',
            link:'/blog/create-post',
            auth:true
        },

    ]

    return (<>
        <Toolbar tools={tools}/>
        <div className={'z-50 bg-red-500'}>
            <h1 className={'text-center pb-4 z-[100]'}>Manage Posts</h1>
            <div className={'wrapper z-50 bg-blue-500'}>
            <ColumnSlider data={sliderData}>
                {Posts?.map((post: any, index) => {

                    return (<div key={5 * index + 5} className={'z-50'} >
                        <div className={'post pl-4 pb-4 z-50'}>
                            <h3 className={'underline'}>Title: {post.title}</h3>
                            <div className={'manage-content flex justify-between '}>
                                <p dangerouslySetInnerHTML={{__html: post.content.slice(4, 50)}}></p>
                                <div className={'manage-content-buttons flex gap-4'}>
                                    <SetFeaturedPostButton postId={post._id} featured_state={post.meta?.featured}
                                                           getOpenState={(open: any) => setShowButtons(!open)}/>
                                    {showButtons && <a href={'/blog/post/edit/' + post._id}>Edit</a>}
                                    <DeletePostButton key={post.id + (index + index)} postId={post._id}
                                                      getOpenState={(open: any) => setShowButtons(!open)}/>
                                </div>


                            </div>
                            <hr/>
                        </div>
                    </div>)
                })}

            </ColumnSlider>
            </div>

        </div>

    </>)

}

export default ManagePosts
