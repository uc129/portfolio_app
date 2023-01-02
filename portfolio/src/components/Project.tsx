import { ProjectCard } from "./ProjectCard";
import {useEffect, useState} from "react";
import sanityClient from "../lib/sanity.client";
import {useParams} from "react-router-dom";
const Project= ({options}:any) => {

    useEffect(()=>{
        options([{name:'Project 1', link:'/project-1'}])
    },[options])

    const {slug} = useParams();
    const [projects, setProjects] = useState([]);
    useEffect( () => {
        sanityClient
            .fetch(`*[_type == "projects"]`)
            .then((data) => setProjects(data))
            .catch(console.error);
    }, []);
    // @ts-ignore
    const curr = projects?.find((project:any)=>project.slug.current === slug);
    if (curr) return<> <ProjectCard project={curr} size={'large'}/></>
    return <></>
}
export default Project
