import {useEffect, useState} from "react";

import sanityClient from "../../lib/sanity.client";
import {Loading} from "./Loading";
import {ProjectCard} from "../ProjectCard";

export const WorksSection=({options}:any)=>{
    useEffect(()=>{
        options([{name:'Work 1', link:'/work1'},{name:'Work 2', link:'/work-2'}])
    },[options])
    const [projects, setProjects] = useState(null);
    // let i=0;
    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "projects"]`)
            .then((data) => setProjects(data)).then(data=>console.log(data))
            .catch(console.error);
        // console.log(data)

    }, [projects]);


    return(
        <div className={'md:w-[1124px] sm:w-[400px] sm:h-[900px]'}>
            <h1 className={'text-center'}>Works</h1>
            <p className={' px-6'}>Here are some of my works</p>

        <div className={'flex justify-between'}>

            <div className={'py-12 pl-4 flex flex-wrap gap-6'}>
                {!projects&&  <Loading/>}
                {/*// @ts-ignore*/}
                {projects?.map((project:any,index:number)=>{

                        if (index>4) return <></>
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
    )
}
