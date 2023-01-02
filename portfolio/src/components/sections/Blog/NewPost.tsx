
import TextEditor from "../../TextEditor";
const NewPost = () => {
    return (<div className={'container p-4'}>
            <h1 className={'text-center'}>New Post</h1>
            <div className={'h-96'}>
                <div><TextEditor pushLink={'http://localhost:5000/api/blog/new/create-post'}/></div>
            </div>
        </div>)
}
export default NewPost
