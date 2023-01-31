import {useEffect, useState} from "react";
import axios from "axios";

const SetFeaturedPostButton= ({ postId,getOpenState,featured_state }: any) => {

    const [showPopup, setShowPopup] = useState(false);
    const [click, setClick] = useState(false)

    const[featured, setFeatured] = useState(featured_state)
    const [featureIcon, setFeatureIcon] = useState(featured_state)

    const handleFeaturedClick =() => {
        setFeatured(!featured)
        setClick(true)
    }
    //on click of feature button, set featured to !featured(false if already featured and vice-versa),
    // and set click to true.

    //useEffect will run when click is true,
    // and will send a post request to the backend to feature/un-feature the post

    useEffect(() => {
        showPopup &&  getOpenState(!showPopup)
        const token = localStorage.getItem('token');
        token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
        !featured && click && axios.post(`http://localhost:5000/api/blog/post/featured/${postId}`)
            .then(() => {
                setFeatureIcon(true)
                setClick(false)
                featured_state= true
                console.log('featured', featured)
                // alert('Post Featured')
                // window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        featured && click && axios.post(`http://localhost:5000/api/blog/post/un-featured/${postId}`)
            .then(()=>{
                setFeatureIcon(false)
                setClick(false)
                featured_state= false
                console.log('un featured', featured)
                // alert('Post Un-Featured')
                // window.location.reload()
            })
    }, [click])
    return(
        <>
        <button onClick={()=> {setShowPopup(true)}} >
            {showPopup?'':featureIcon?'featured':'feature?'}</button>
            {showPopup && <div className={'popup'}>
                <div className={'popup-inner'}>
                <h1>{featureIcon?'Un Feature This Post?':'Feature This Post?'}</h1>
                <div className={'popup-buttons flex justify-between gap-4'}>
                    <button onClick={()=>setShowPopup(false)}>Close</button>
                    <div className={'flex justify-between gap-4'}>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        <button onClick={ handleFeaturedClick}>{featureIcon?'Un-Feature?':'Feature?'}</button>
                    </div>
                </div>
                </div>
            </div>}

            </>
    )
}
export default SetFeaturedPostButton
