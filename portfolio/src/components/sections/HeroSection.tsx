// import Background from "../Background";






// import {Toolbar} from "../Toolbar";

import {Toolbar} from "../utils/Toolbar";
const HeroSection = () => {





    const typeWriter = (text: string, i: number, fnCallback: any) => {
        if (i < (text.length)) {
            // @ts-ignore
            const doc= document.getElementById("typewriter")
            doc && (doc.innerHTML = text.substring(0, i + 1) + '<span' +
                ' aria-hidden="true"></span>')
            setTimeout(() => {
                typeWriter(text, i + 1, fnCallback)
            }, 140);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }
    const type= ()=>typeWriter('I am a Full Stack Developer', 0,
        () => {typeWriter('User-Friendly Design',0,
            ()=>{typeWriter('Authentic Designer',0,
                ()=>{typeWriter('Original Thinker',0,
                    ()=>{typeWriter('CSS,PHP,MongoDB,MySql,PostgresQL',0,
                        ()=>{typeWriter('Js,React,NodeJs,GraphQL,Python',0,()=>{})})})})})})

    setTimeout(()=>type(),4000)
    setInterval(()=>{
        type()
    },48000)


    let tools =[{name:'Profile', link:'/profile'},{name:'News', link:'/news'}]
    return (
        <>

            <Toolbar tools={tools}/>
        <div className={'grid grid-rows-2 grid-cols-8 bg-clip-content hero-section'}>
            {/*<Background/>*/}
            <div className={'flex flex-col row-start-1 col-start-3 col-span-4 py-6'}>
                    <h1 className={'text-6xl text-center hero-heading font-cursive '}> Hi, <br/> I'm Utkarsh(Kash), <br/> Web Developer</h1>
                    <p className={'text-amber-700 font-cursive '}> Full Stack Developer </p>
                    <button className={'mx-auto w-max  p-2 hover:text-bold font-cursive '}>
                        <a href={'/contact-me'} className={' underline decoration-1 underline-offset-4 ' +
                            'hover:text-amber-500'} >Contact Me</a>
                    </button>
            </div>
            <div className={'text-left p-6 row-start-2 col-start-1 col-end-8'}>
                <p id={'typewriter'} className={'text-cyan-800 font-paragraph'}></p>
            </div>
        </div>
        </>

        )
}
export default HeroSection
