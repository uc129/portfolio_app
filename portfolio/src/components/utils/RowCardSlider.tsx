
const  RowCardSlider=({children,data}:any)=>{

    return <>

        <div className={'row-slider-wrapper bg-orange-300' +
            ' bg-opacity-60 bg-clip-img border-l border-r border-t' +
            ' border-amber-700'}>
            {data &&
                <div className={'flex gap-6 px-6 bg-red-300 ' }>
                <span> Total posts:{data.totalItems} </span>
                <span> User:{data.user.name} </span>
                </div>
            }
            <div className={'row-slider-content flex py-6 gap-6 justify-between  w-full' +
                ' overflow-x-scroll z-50'}>
                {children}
            </div>
        </div>

    </>

}

export default RowCardSlider
