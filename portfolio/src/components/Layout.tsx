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
                     <div className={'w-32 px-4 py-2 h-[400px]'}>
                         <NavSection/>
                     </div>
                {/*//Content*/}
                <div className={' md:w-[1224px]  md:h-[600px] border-l-2 border-black' +
                    'sm:w-[200px] sm:h-[640px] border-l-2 border-black '}>
                    {children}
                </div>
                {/*//Footer*/}
            <div className={' w-[1424px] '}>
                <FooterSection/>
            </div>
        </div>
            </Background>
        </div>

    )

}
export default Layout
