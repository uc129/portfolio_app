
const  RowCardSlider=({children,data}:any)=>{

    return <>

        <div className={'row-slider-wrapper border-l border-r border-t border-amber-700'}>
            {data && <div className={'flex gap-6 bg-orange-400 px-6'}>
                <span> Total posts:{data.totalItems} </span>
                <span> User:{data.user.name} </span>
            </div>}
            <div className={'flex py-6 gap-6 justify-between max-h-fit w-full bg-red-300 overflow-x-scroll'}>
                {children}
            </div>
        </div>

    </>

}

export default RowCardSlider
