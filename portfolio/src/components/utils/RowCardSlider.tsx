
const  RowCardSlider=({children,data}:any)=>{

    return <>

        <div className={'row-slider-wrapper bg-orange-300' +
            ' bg-opacity-60  border-l border-r border-t' +
            ' border-amber-700'}>
            <div className={'flex gap-6 px-6 bg-red-300 h-7 border-b border-red-500' }>
                        <span> Total posts:{data.totalItems&& data.totalItems}</span>
                        <span> User:{ data.user&& data.user.name} </span>
            </div>
            <div className={'row-slider-content flex py-6 gap-6 justify-between align-center w-full h-full' +
                ' overflow-x-scroll overflow-y-hidden z-50'}>
                {children}
            </div>
        </div>

    </>

}

export default RowCardSlider
