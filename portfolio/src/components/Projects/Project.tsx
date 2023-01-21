import { ProjectCard } from "./ProjectCard";
import {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import sanityClient from "../../lib/sanity.client";
import {Toolbar} from "../utils/Toolbar";





const Project= () => {


      let tools=[{name:'Project 1', link:'/project-1'}]


    const {slug} = useParams();
    const [projects, setProjects] = useState([]);
    useEffect( () => {
        sanityClient.fetch(`*[_type == "projects"]`)
            .then((data) => setProjects(data))
            .catch(console.error);
    }, []);
    // @ts-ignore
    const curr = projects?.find((project:any)=>project.slug.current === slug);
    if (curr)
        return<>
            <Toolbar tools={tools}/>
        <ProjectCard project={curr} size={'large'}/>
            </>
    return <></>
}
export default Project
