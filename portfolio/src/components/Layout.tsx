import NavSection from "./sections/NavSection";
import FooterSection from "./sections/FooterSection";
import Background from "./Background";

import { useNavigate} from "react-router-dom";

export const BackButton= () => {
    let navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
};

export const ForwardButton= () => {
    let navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate(1)}>Forward</button>
        </>
    );
};

const Layout=({children,tools}:any,)=>{
    let buttons=  tools.map((tool:any,index:any)=>{
      if (tool.link) return <a key={index} href={tool.link}>{tool.name}</a>
      return <></>
    })

    return (
        <>
            <Background/>
            <div className={'layout flex flex-wrap  border-2 border-black' +
                ' md:w-screen font-mono md:h-screen m-0 p-0 relative' +
                'sm:w-[400px] sm:h-[900px]'}>

                {/*//sidebar*/}
                     <div className={'w-32 px-4 py-2 h-[400px]'}>
                         <NavSection/>
                     </div>
                {/*//Content*/}
                <div className={' md:w-[1224px]  md:h-[600px] border-l-2 border-black' +
                    'sm:w-[200px] sm:h-[640px] border-l-2 border-black '}>

                        <div className={'w-fit gap-6 pt-4 ml-6 flex justify-between border-b border-black'}>
                            <BackButton/>
                            <ForwardButton/>
                            {buttons?buttons:<></>}

                    </div>
                    {children}
                </div>
                {/*//Footer*/}
            <div className={' w-[1424px] border-t-2 border-black'}>
                <FooterSection/>
            </div>
        </div>
        </>

    )

}
export default Layout
