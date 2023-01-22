import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Auth1Context from "../../context/Auth1Context";



export function Toolbar({tools}:any) {

    let context= useContext(Auth1Context);
    const [authUser, setAuthUser] = useState(null);
    const{isAuthenticated}:any= useContext(Auth1Context);

    useEffect(() => {
        setAuthUser(context.user)
    }, [context]);


    let buttons= <>
        <a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} onClick={() => navigate(-1)}>Back</a>
        <a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} onClick={() => navigate(1)}>Forward</a>
        {tools?.map((tool:any,index:any)=>{
            if (tool.link) {
                if(tool.auth && !isAuthenticated )
                    return null
                else if(!tool.auth && isAuthenticated)
                    return null
                else
                    return <a className={'hover:translate-y-0.5 hover:text-blue-400' +
                    ' border-b border-black'}
                          key={index} href={tool.link}>{tool.name}</a>

            }
            return <></>
        })}</>
    let navigate = useNavigate();

    return (
        <div className={'w-full gap-6 pt-4 ml-6 mb-6 flex justify-between  text-emerald-900' +
            ' bg-clip-content'}>
            <div className={'w-fit gap-6  flex justify-between'}>
                {buttons?buttons:<></>}
            </div>

            <div className={'flex gap-6 justify-between'}>
                {authUser?<a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} onClick={() => context.logOut()}>Logout</a>:<></>}
                {/*// @ts-ignore*/}
                {authUser && <p> Welcome {authUser.name} </p>}
            </div>

        </div>
    )
}



