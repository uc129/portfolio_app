
// import Background from "./Background";


import NavSection from "./sections/NavSection";
import FooterSection from "./sections/FooterSection";
import Background from "./Background";

const Layout=({children}:any,)=>{
    return (
        <div>

            <Background>
            <div className="custom-shape-divider-top-1672748789">

            </div>
            <div className={'layout flex flex-wrap  border-2 border-black' +
                ' md:w-screen font-mono md:h-screen m-0 p-0 relative' +
                'sm:w-[400px] sm:h-[900px]'}>
                {/*//sidebar*/}
                     <div className={'w-[10vw] px-4 py-2 h-[400px]'}>
                         <NavSection/>
                     </div>
                {/*//Content*/}
                <div className={'w-[80vw] h-[85vh] border-l-2 border-black' +
                    'sm:w-[200px] sm:h-[640px] border-l-2 border-black '}>
                    {children}
                </div>
                {/*//Footer*/}
            <div className={' w-screen h-[14vh] pb-10 '}>
                <FooterSection/>
            </div>
        </div>
            </Background>
        </div>

    )

}
export default Layout
