
// noinspection SpellCheckingInspection




import {urlFor} from "../lib/sanity.imageurl";

export const ProjectCard=({project,size}:any)=>{

    const small =
        <div className={'grid grid-rows-7 max-w-xs bg-gray-600 bg-opacity-20 border-2 p-2 break-words z-10'}>
        <h1>{project.name}</h1>
        <span> ---- </span>
        <br/>

        {   project.description.length >80? project.description.slice(0,80)+'\n...':project.description}
        <br/>
            <p> <a className={'hover:text-amber-700'} href={`/works/projects/${project.slug.current}`}>Read More...</a></p>
            <span>--*-- </span>

        </div>

    const large=
        <div className={'p-12'}>
            <h1>Title: {project.name} </h1>
            <p>{project.Icon}</p>
            {/*// @ts-ignore*/}
            <img className={'w-4/12 grayscale'} src={urlFor(project.images[0])} alt={project.name+'alt'} />
             <h6>Description:</h6> <p> {project.description} </p>

            <a className={'p-4'} href={project.projecturl}>Visit Project</a>
            <a className={'p-4'} href={project.githuburl}>See Source Code</a>
        </div>



    return(<>{size==='small'?small:large}</>)}
