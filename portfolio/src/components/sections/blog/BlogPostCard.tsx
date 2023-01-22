import {art2} from "../../Background";
import {useEffect, useState} from "react";

export const BlogPostCard=({post,size}:any, )=>{

    const content = post.content;
    const smallContent = content && content.slice(0, 100);

    let small_card= document.getElementById('post-content-sm')
    let large_card= document.getElementById('post-content-lg')
    small_card&& (small_card.innerHTML = smallContent);
    large_card&& (large_card.innerHTML = content);

    const [randIndex, setRandIndex] = useState(null as any)

useEffect(()=>{
    const randomIndex= Math.floor(Math.random()*art2.length-1)
    !randIndex&& setRandIndex(randomIndex+1)
},[])




    if (size === 'small') {
        return <div className={'px-8 w-max flex-col border-r max-h-52 h-52 border-black'}>
            {/*<h1 className={'underline pb-4'}>Blog Post Card</h1>*/}
            {randIndex && <object className={'h-20 w-20 mx-auto'} data={art2[randIndex].url}/>
            }
            <p><span className={'font-bold'} >Date:</span> <span> {post.date}</span></p>
            <p><span className={'font-bold'}>Title:</span> <span> {post.title}</span></p>
            <p><span className={'font-bold'}>Content:</span> <span id={'post-content-sm'}> </span></p>
            <a href={`/blog/${post.slug}`} > Read more... </a>

        </div>
    }

    if (size === 'large') {
        return (

                <div className={'px-8'}>
                    {randIndex &&
                        <img className={'h-80 w-80 opacity-20 absolute mx-auto'}
                          src={art2[randIndex].url} alt={'bg-img'}/>}
                    <h1 className={'font-bold'}> {post.title}</h1>
                    <p>Date:</p> <p> {post.date}</p>
                    <div id={'post-content-lg'}></div>
                </div>

           )
    }

    return <div> Describe Post card size </div>



}
