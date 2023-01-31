const ColumnSlider=({children,data}:any)=>{

let user= JSON.parse(localStorage.getItem('user')||'{}')

    return(
        <>
            {/*// height= h-96 -> Manage Posts Component   */}
        <div className={`column-slider-wrapper overflow-y-scroll ${data && data.height}`}>
            <div className={'flex gap-6  bg-red-300 '}>
                {data && <span className={'bg-red-300 '} > Total Items: {data.length} </span>}
                {/*@ts-ignore*/}
                {user && <>
                    <span> User:{user.name}</span>
                    <span>  {user.email}</span>
                </>}
            </div>
            <div className={'col-slider-content flex-col gap-6 py-4 z-50'}>
                {children}
            </div>

        </div>

        </>
    )
}

export default ColumnSlider
