import {useEffect, useState} from "react";

import sanityClient from "../../lib/sanity.client";
import {LoadingSection} from "./LoadingSection";


// import {ProjectCard} from "./projects/ProjectCard";
// import {Toolbar} from "../utils/Toolbar";
import {Toolbar} from "../utils/Toolbar";
import {ProjectCard} from "./projects/ProjectCard";



export const WorksSection=()=>{

    const [projects, setProjects] = useState(null);
    // let i=0;
    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "projects"]`)
            .then((data) => setProjects(data))
            .catch(console.error);
        // console.log(data)
    }, );


let tools=[{name:'Work 1', link:'/work1'},{name:'Work 2', link:'/work-2'}]


    return(
        <>
            <Toolbar tools={tools}/>
        <div className={'md:w-[1124px] sm:w-[400px] sm:h-[900px]  bg-white bg-opacity-10'}>
            <h1 className={'text-center'}>Works</h1>
            <p className={' px-6'}>Here are some of my works</p>
        <div className={'flex justify-between'}>
            <div className={'py-12 pl-4 flex flex-wrap gap-6'}>
                {!projects&&  <LoadingSection/>}
                {/*// @ts-ignore*/}
                {projects?.map((project:any,index:number)=>{

                        if (index>4) return <span key={index}></span>
                        return <ProjectCard key={index} project={project} size={'small'}/>


                })}

            </div>

            <div className={' recent-projects w-1/4 '}>
                <h1>Recent Projects</h1>
                <div className={'flex flex-col'}>
                    {/*{Posts.map((post)=>{*/}
                    {/*    return <BlogPostCard post={post} size={'small'} key={post.id}/>*/}
                    {/*})}*/}
                    recent projects
                </div>
            </div>
        </div>
        </div>
            </>
    )
}
