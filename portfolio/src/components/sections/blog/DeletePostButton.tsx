import axios from "axios";
import {useEffect, useState} from "react";

const DeletePostButton = ({ postId,getOpenState }: any) => {

const [showPopup, setShowPopup] = useState(false);
const [toDelete, setToDelete] = useState(false);
    const handleDeleteClick =() => {
        setToDelete(true)
    }

    useEffect(() => {
       showPopup &&  getOpenState(!showPopup)
        console.log('show popup', showPopup)
        const token = localStorage.getItem('token');
        token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
        console.log('to delete', toDelete)
        toDelete &&  axios.delete(`http://localhost:5000/api/blog/post/delete/${postId}`)
            .then(res => {
                console.log(res)
                alert('Post Deleted')
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }, [toDelete])
    return(
        <>
        <button onClick={()=> {
            setShowPopup(true)
        }} >{showPopup?'':'Delete'}</button>
            {showPopup && <div className={'popup'}>
                <div className={'popup-inner'}>
                <h1>Are you sure you want to delete this post?</h1>
                <div className={'popup-buttons flex justify-between gap-4'}>
                    <button onClick={()=>setShowPopup(false)}>Close</button>
                    <div className={'flex justify-between gap-4'}>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        <button onClick={ handleDeleteClick}>Delete</button>
                    </div>

                </div>
                </div>
            </div>}
        </>
    )

}

export default DeletePostButton
