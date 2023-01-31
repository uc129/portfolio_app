import {useContext, useEffect, useState} from "react";
import axios from "axios";

import Auth1Context from "../../../context/Auth1Context";
import {CustomFormField} from "../../utils/customForm";
import TextEditor from "../../utils/TextEditor";
import PopUpForm from "../../utils/PopUpForm";
import FileUploadButton, {FileUploadButtonFileTypes} from "../../utils/FileUploadButton";


const NewPost = () => {

    const [meta, setMeta] = useState(false);
    const [save, setSave] = useState(false);
    const [editorData, setEditorData] = useState(undefined as string | undefined);
    const [editor, setEditor] = useState();
    const [metaData, setMetaData] = useState({
        title: '',
        description: '',
        tags: '',
        categories: '',
    })
    const [uploadFiles, setUploadFiles] = useState(null as FileList | null)
    const context = useContext(Auth1Context);

    const getEditor = (editor: any) => {
        setEditor(editor);
    }
    const handleSaveClick = () => {
        setSave(true)
        // @ts-ignore
        editor && setEditorData(editor?.getHTML())
    }

    const handleMetaClick = () => {
        setMeta(true)
    }

    const metaFormFields: CustomFormField[] = [
        {
            name: 'title',
            type: 'text',
            placeholder: 'Enter title',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
            placeholder: 'Enter description',
        },
        {
            name: 'categories',
            type: 'text',
            placeholder: 'Enter category'
        },
        {
            name: 'tags',
            type: 'text',
            placeholder: 'Enter tags'
        },

    ]
    const getModalState = (meta: boolean) => {
        setMeta(meta)
    }
    const getPopupFormData = (data: any) => {
        setMetaData(data)
    }

    useEffect(() => {
        console.log('content', editorData)
        let metDataCheck = false;
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // @ts-ignore
        const {title, description, categories, tags} = metaData
        if (title.length > 2 && description.length > 2) {
            metDataCheck = true
            // @ts-ignore
            const ownerID = context.user?.id
            const slug = title && title.split(' ').join('-')
            // const images = uploadFiles && uploadFiles
            // let images:any=[]
            let images:any={}
            let key:any
            for(key in uploadFiles){
                let i=0;
                if(key === 'length' || key === 'item')continue
                console.log('key',  key)
                // uploadFiles && images.push(uploadFiles[key])
                uploadFiles && (images['file'+key] = uploadFiles[key])
                i++
            }
            console.log('images', images)
            const content = editorData && JSON.stringify(editorData)
            const post_data = {title, description, categories, tags, content, ownerID, slug,images}
            console.log('post_data', post_data)
            post_data && save && editor && editorData && metDataCheck && axios.post('http://localhost:5000/api/blog/new/create-post', post_data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })


                .then(r => r && window.location.reload())
                .catch(e => console.log('post create error', e))
            // save && console.log('editor data', editorData)

        } else {
            console.log('meta data error')
        }
        setSave(false)

    }, [editorData, save, metaData, context.user, editor])


    return (<div className={'container p-4 '}>
        <h1 className={'text-center'}>New Post</h1>
        <div className={'h-full bg-red-400'}>
            <div><TextEditor retrieveEditorClient={getEditor}/></div>
            <div className={'flex justify-between gap-6'}>
                <FileUploadButton name={'post_images'} getFiles={(files) => setUploadFiles(files)}
                                  accept={FileUploadButtonFileTypes.imageType} multiple={true}/>
                {meta ? <PopUpForm openState={getModalState} name={'Post MetaData'} retrieveFormData={getPopupFormData}
                                   formFields={metaFormFields}/>
                    : <>
                        <button onClick={handleMetaClick}>Add MetaData</button>
                    </>}

            </div>
            {!meta && metaData.title.length > 2 &&
                <button className={'text-amber-600 hover:text-blue-300 z-20 px-4'}
                        onClick={handleSaveClick}>Save</button>}
        </div>
    </div>)
}
export default NewPost
