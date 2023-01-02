// import Background from "../Background";

import {useEffect} from "react";

const HeroSection = ({options}:any) => {

    useEffect(()=>{
        options([{name:'Profile', link:'/profile'},{name:'News', link:'/news'}])
    },[options])


    return (
        <div className={'grid grid-rows-2 grid-cols-8'}>
            {/*<Background/>*/}
            <div className={'flex flex-col row-start-1 col-start-5 col-end-8 py-6'}>
                    <h1 className={'text-3xl'}> Hi, <br/> I'm Utkarsh(Kash), <br/> Web Developer</h1>
                    <p className={'text-amber-700'}> Full Stack Developer </p>
                    <button className={'text-blue-300  p-2'}>
                        <a href={'/contact-me'} className={' underline decoration-1 underline-offset-4' +
                            ' hover:text-amber-500 hover:bg-blue-200 hover:text-bold'} >Contact Me</a>
                    </button>
            </div>
            <div className={'text-left p-6 row-start-2'}>
                <p className={''} > hello </p>
            </div>
        </div>

        )
}
export default HeroSection
