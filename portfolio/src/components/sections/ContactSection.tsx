import CustomForm, {CustomFormField} from "../customForm";
import {Toolbar} from "../Toolbar";

export const ContactSection = () => {

    //Send Tools to toolbar
    let tools = [{name: 'Send', link: '/contact/send'}]


    const formFields:CustomFormField[] = [
        {name:'name', type:'text', placeholder:'Utkarsh',min:3,max:20},
        {name:'email', type:'email', placeholder:'uc129@gmail.com'},
        {name:'message', type:'textarea', placeholder:'Your message'},
        {name:'submit', type:'submit', value:'Contact Me'},
    ]

    return (
<>
        <Toolbar tools={tools}/>
        <CustomForm fields={formFields} form_title={'Contact Me Form'} form_method={'post'}
                    form_action={'http://localhost:5000/api/contactme'} />
</>
    )

}
