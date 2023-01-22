import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import TextEditor from "../../utils/TextEditor";
import PopUpForm from "../../utils/PopUpForm";
import {CustomFormField} from "../../utils/customForm";
import {Editor} from "@tiptap/react";

const EditPost=()=>{
    const {post_id} = useParams();
    const token = localStorage.getItem('token')
    token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);

    const [oldPost, setOldPost] = useState({title: '', content: '', description: '',tags: '', categories: ''})
    const[editor, setEditor] = useState<Editor>()
    const [editorData, setEditorData] = useState()
    const[editorDataCheck, setEditorDataCheck] = useState(false)
    const[save, setSave] = useState(false)
    const[showPopup, setShowPopup] = useState(false)
    const[oldDataCheck, setOldDataCheck] = useState(false)
    // const [newPostData, setNewPostData] = useState({title: '', content: '', description: '',tags: '', categories: ''})
    const [popupData, setPopupData] = useState({
        title: '',
        description: '',
        categories: '',
        tags: '',

    })

    const getOldPostData = async () => {
        const response = await axios.get('http://localhost:5000/api/blog/post/single/'+post_id)
            .catch(e => console.log('error', e))
        // response && console.log('old post data',response.data)
        response && setOldPost(response.data)
        oldPost && setOldDataCheck(true)
        return response
    }

    const getNewPostData = async () => {
        // let content,title,description,categories,tags;
        // @ts-ignore
        let {title,description,categories,tags,content} = oldPost
        // @ts-ignore
        if(editorData && editorData.length>2) {
            content = editorData
        }
        if (popupData && popupData.title.length>2 && popupData.description.length>2){
            title = popupData.title
            description = popupData.description
            categories = popupData.categories
            tags = popupData.tags
        }

        const new_post_data={
            title: title,
            content: content,
            description: description,
            categories: categories,
            tags: tags
        }
        const response = await axios.post('http://localhost:5000/api/blog/post/update/'+post_id, new_post_data)
            .then(r=>r)
            .catch(e=>console.log('error',e))
            response && setSave(false)
            response && alert('Post updated successfully');
            window.location.href = '/blog/manage-posts'

    }
    useEffect(() => {
        !editorDataCheck&& editor && oldPost && editor.commands.setContent(oldPost.content) && setEditorDataCheck(true)
       !oldDataCheck && getOldPostData().then(r => console.log('old post', oldPost,r))
        save && oldDataCheck && getNewPostData().then(r => console.log('new post',r))
    },[editorDataCheck,oldDataCheck,save])
    const getEditorData = async (data: any) => {
        setEditorData(data)
    }
    const popupFormFields:CustomFormField[] = [
        {
            name: 'title',
            type: 'text',
            // @ts-ignore
            placeholder: oldPost?.title,
            required: true,

        },
        {
            name: 'description',
            type: 'text',
            // @ts-ignore
            placeholder: oldPost?.description,

        },
        {
            name:'categories',
            type:'text',
            // @ts-ignore

            placeholder:oldPost?.categories,

        },
        {
            name:'tags',
            type:'text',
            // @ts-ignore
            placeholder:oldPost?.tags,
        }
    ]
    function handleSaveClick() {
        setSave(true)
    }
    return (<>

        <div>
            <h1>Edit Post</h1>
            {oldPost &&
                <div>
                {/*// @ts-ignore*/}
                <TextEditor  retrieveEditorData={getEditorData} retrieveEditorClient={(editor:Editor)=>setEditor(editor)}/>
                {!showPopup &&
                    <div>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setShowPopup(true)}>Edit MetaData</button>
                    </div>}
                    {showPopup &&
                        <PopUpForm
                            openState={(state: boolean | ((prevState: boolean) => boolean))=>setShowPopup(state)}
                            formFields={popupFormFields}
                            retrieveFormData={(data: any)=>setPopupData(data)}


                        />}
                </div>}
        </div>



    </>)


}

export default EditPost
