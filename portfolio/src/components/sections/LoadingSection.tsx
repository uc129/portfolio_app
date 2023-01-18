import {useState} from "react";

export const LoadingSection= () => {

    const loadingTime = 5000;
    const loading= <div className={'animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'}/>
    const timeoutMessage =  <div className={'p-14 border-b border-black'}>
        <p className={' hover:translate-y-0.5 '}>
            Unable to fetch resource! Please try refreshing in some time. </p>
        </div>

    const [loadingComp, setLoadingComp] = useState(loading)

    setTimeout(() => {
        setLoadingComp(timeoutMessage)
    }, loadingTime);


    return (
                <>
                    <div className={'flex justify-center items-center'}>
                    {loadingComp}
                    </div>
                </>
    );
};

