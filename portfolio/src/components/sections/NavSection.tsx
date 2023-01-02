// import Background from "../Background";
import {Link} from "react-router-dom";
import LoginButton from "./LoginButton";

const NavSection= ()=>{

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
    //     sing up,login links are sent through BlogSection
    ]


    return(
        <div className={' flex flex-col border-r-2 border-black  '}>
            {NavData.map((item,index)=>{
                return   <Link key={index} to={item.link}>{item.name}</Link>
            })}
            <LoginButton/>
        </div>
    )

}

export default NavSection
