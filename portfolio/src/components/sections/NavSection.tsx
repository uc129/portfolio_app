// import Background from "../Background";
import {Link} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {useContext} from "react";
import Auth1Context from "../../context/Auth1Context";
// import useAuth from "../../utils/AuthHook";
// import {useEffect, useState} from "react";

// import LoginButton from "./LoginButton";

const NavSection= ()=>{

    // const [loggedIn, setLoggedIn] = useState(false);
    const{isAuthenticated}:any= useContext(Auth1Context);

    const NavData=[
        {
            name:'Home',
            link:'/'
        },
        {
            name:'Blog',
            link:'/blog'
        },
        {
            name:'Works',
            link:'/works'
        },
        {
            name:'Contact',
            link:'/contact-me'
        },
        {
            name: 'Sign Up',
            link: '/blog/signup'
        },
        {
            name: 'Login',
            link: '/blog/login'
        },
        {
            name:'Profile',
            link:'/profile'
        },
        {
            name: 'Edit Profile',
            link: '/profile/update-profile'
        },
        {
            name: 'Manage Posts',
            link: '/blog/manage-posts'
        },
        {
            name: 'Edit Post',
            link: '/blog/edit-post'
        },
        {
            name: 'Logout',
            link: '/blog/logout'
        },
        {
            name: 'Books Library',
            link: '/interests/reading/library'
        },
        {
            name: 'Music Library',
            link: '/interests/music/library'
        }

    //     sing up,login links are sent through BlogSection
    ]


    return(
        <div className={' flex flex-col border-r-2 border-black text-sky-800 md:text-sm '}>
            {NavData.map((item,index)=>{
                return   <Link className={'mt-2 underline hover:translate-y-0.5 hover:text-blue-400'} key={index} to={item.link}>{item.name}</Link>
            })}
            {isAuthenticated && <LogoutButton/>}

        </div>
    )

}

export default NavSection
