import {useEffect} from "react";
import CustomForm, {CustomFormField} from "../customForm";

export const ContactSection = ({options}:any) => {

    //Send Tools to toolbar
    useEffect(()=>{
        options([{name:'Contact-1', link:'/contact-me'}])
    },[options])

    const formFields:CustomFormField[] = [
        {name:'name', type:'text', placeholder:'Utkarsh',min:3,max:20},
        {name:'email', type:'email', placeholder:'uc129@gmail.com'},
        {name:'message', type:'textarea', placeholder:'Your message'},
        {name:'submit', type:'submit', value:'Contact Me'},
    ]

    return (

        <CustomForm fields={formFields} form_title={'Contact Me Form'} form_method={'post'}
                    form_action={'http://localhost:5000/api/contactme'} />

    )

}
