import React from "react";
import {useNavigate} from "react-router-dom";

export function Toolbar({tools}:any) {

    let buttons= <>
        <a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} onClick={() => navigate(-1)}>Back</a>
        <a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} onClick={() => navigate(1)}>Forward</a>
        {tools?.map((tool:any,index:any)=>{
        if (tool.link) return <a className={'hover:translate-y-0.5 hover:text-blue-400 border-b border-black'} key={index} href={tool.link}>{tool.name}</a>
        return <></>
    })}</>
    let navigate = useNavigate();
    return (
        <div className={'w-fit gap-6 pt-4 ml-6 mb-6 flex justify-between  text-emerald-900' +
            ' bg-clip-content'}>

            {buttons?buttons:<></>}
        </div>
    )
}



