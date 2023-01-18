
import {useEffect, useState} from "react";
import CustomForm from "./customForm";



const PopUpForm = ({name,formFields,openState,retrieveFormData}:any) => {
    const [opened, setOpened] = useState(true);
    const [popupClass, setPopupClass] = useState('hidden')
    useEffect(() => {
        opened && setPopupClass('block')
        !opened && setPopupClass('hidden')
    },[opened])
    openState(opened)
    return (
        <>
    <div  className={`h-max w-full flex-col ${popupClass} `}  >
        <button className={'align-sub'} onClick={()=>setOpened(!opened)}>close</button>
        <CustomForm fields={formFields} form_title={name} retrieveFormData={(res)=>retrieveFormData(res)} />
    </div>


        </>)

}
export default PopUpForm
