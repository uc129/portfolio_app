import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";
import useAuth from "../utils/AuthHook";


interface CustomFormProps {
    fields: CustomFormField[],
    form_title: string,
    form_method?: string,
    form_action?: string
    retrieveAxiosData?: (data: any) => void
    retrieveFormData?: (data: any) => void

    //type: 'signup' | 'login' | 'logout' | 'custom'
    type?: string
}

export interface CustomFormField {
    name: string,
    type: string,
    placeholder?: string,
    value?: string,
    required?: boolean
    min?: number,
    max?: number
}

interface formErrorInterface {
    [key: string]: string
}

interface formDataInterface {
    [key: string]: string | File
}

interface formStringInterface {
    [key: string]: string
}


const CustomForm = ({fields, form_title, form_method, form_action,type, retrieveAxiosData,retrieveFormData}: CustomFormProps) => {

    const [formData, setFormData] = useState({} as formDataInterface);
    const [state, setState] = useState({errors: {} as formErrorInterface})
    const context = useAuth();
    console.log('context', context);
    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
        // setState({...state, fields: {...state.fields, [name]: value}})
    }
    const handleSubmit = (e: React.MouseEvent<Element, MouseEvent>) => {
        let data
        e.preventDefault();
        if (handleValidation()) {
            if ((form_method === 'post' || form_method === 'POST') && form_action) {
                axios.post(form_action, formData).then((res: AxiosResponse<any>) => {
                    data = res.data;
                    res.status === 200 && console.log(data);
                    alert("Form submitted");
                }).catch((err: any) => {
                    console.log(err)
                    alert(err)
                })
            }
            if (retrieveAxiosData) {
                retrieveAxiosData(data)
            }
            if (retrieveFormData) {
                retrieveFormData(formData)
            }
            if (type === 'login') {
                context.logIn(formData.email, formData.password)
                    .then((res: any) => console.log('login context res: ',res))
                console.log('login type')
            }
            if (type === 'register' || type === 'signup') {
                context.register(formData).then((res: any) => console.log('register context res: ',res))
                console.log('register type')

            }
            console.log('data',formData)
            alert("Form submitted");
        } else if (!handleValidation()) alert("Form has errors.")

    }
    const setErrorClass = (field: string) => {
        return state.errors[field] ? 'border border-red-600' : '';
    }


    //Form Fields
    let submitText: String | undefined = 'Submit';
    const formFields = fields.map((field: CustomFormField, index: any) => {
        if (field.type === 'submit') {
            submitText = field.value;
            return <></>
        } else if (field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'textarea') {
            return <div key={index} className="form-input-group border-black border-r">
                <label key={field.name} htmlFor={field.name}>{field.name}</label>
                {state.errors[field.name] &&
                    <span key={'error ' + index} className="error text-xs ">{state.errors[field.name]}</span>}
                <input key={field.placeholder} className={setErrorClass(field.name)} type={field.type} name={field.name}
                       placeholder={field.placeholder || ''} onChange={(e: any) => handleChange(e)}/>
            </div>
        } else if (field.type === 'image') {
            return <div className="form-input-group border-black border-r" key={index}>
                <img className={'w-12 h-12 '} key={field.placeholder} alt={field.placeholder} src={field.value}/>
                {state.errors[field.name] &&
                    <span key={state.errors[field.name]} className="error">{state.errors[field.name]}</span>}
            </div>
        } else if (field.type === 'file') {
            return <div className="form-input-group border-black border-r flex-wrap" key={index}>
                <label key={field.name} htmlFor={field.name}>{field.name}</label>
                <input key={field.placeholder} className={'w-4/12'} name={field.name} type={field.type}
                       onChange={(e: any) => handleChange(e)}
                       placeholder={field.placeholder}/>
                {state.errors[field.name] &&
                    <span key={state.errors[field.name]} className="error">{state.errors[field.name]}</span>}
            </div>
        } else return <></>

    })


    //Form Validation
    const handleValidation = () => {
        let errors = {} as formErrorInterface;
        let formIsValid = true;
        let checkData = formData as formStringInterface;
        //Name
        fields.map((field: CustomFormField) => {
            if (field.name === 'name' && field.required) {
                if (!checkData['name']) {
                    formIsValid = false;
                    errors['name'] = 'Cannot be empty';
                }
            }
            if (checkData['name']) {
                if (!checkData['name'].match(/^[a-z 1-9,.'-]+$/i)) {
                    formIsValid = false;
                    errors['name'] = 'Alpha Numeric only';
                }
            }
            //Email
            if (field.name === 'email' && field.required) {
                if (!checkData['email']) {
                    formIsValid = false;
                    errors['email'] = 'Cannot be empty';
                }
            }
            if (checkData['email']) {
                let lastAtPos = checkData['email'].lastIndexOf('@');
                let lastDotPos = checkData['email'].lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && checkData['email'].indexOf('@@') === -1 && lastDotPos > 2 && (checkData['email'].length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors['email'] = 'Email is not valid';
                }
            }
            //Password
            if (field.name === 'password' && field.required) {
                if (!checkData['password']) {
                    formIsValid = false;
                    errors['password'] = 'Cannot be empty';
                }
            }
            if (checkData['password']) {
                if (checkData['password'].length < 6) {
                    formIsValid = false;
                    errors['password'] = 'Password must be 6 characters and contain at least one number.';
                }
            }
            //Confirm Password
            let confPassFieldNames = ['confirmpassword', 'conf_password', 'confirm_password', 'confirmPassword', 'confPassword']
            if (confPassFieldNames.includes(field.name) && field.required) {
                if (!checkData['confirmpassword']) {
                    formIsValid = false;
                    errors['confirmpassword'] = 'Cannot be empty';
                }
            }
            if (checkData['confirmpassword']) {
                if (!checkData['confirmpassword'].match(checkData['password'])) {
                    formIsValid = false;
                    errors['confirmpassword'] = 'Passwords do not match';
                }
            }
            //Phone
            if (field.name === 'phone' && field.required) {
                if (!checkData['phone']) {
                    formIsValid = false;
                    errors['phone'] = 'Cannot be empty';
                }
            }
            if (checkData['phone']) {
                if (!checkData['phone'].match(/^\d{10}$/)) {
                    formIsValid = false;
                    errors['phone'] = 'Phone number is not valid, must be 10 digits';
                }
            }
            //Age
            if (field.name === 'age' && field.required) {
                if (!checkData['age']) {
                    formIsValid = false;
                    errors['age'] = 'Cannot be empty';
                }
            }
            if (checkData['age']) {
                if (!checkData['age'].match(/^[0-9]+$/)) {
                    formIsValid = false;
                    errors['age'] = 'Age is not valid, must be a number';
                }
            }
            //File
            if (field.name === 'file' && field.required) {
                if (!checkData['file']) {
                    formIsValid = false;
                    errors['file'] = 'Cannot be empty';
                }
            }
            // if (checkData['file']) {
            //     if (!checkData['file'].match(/.(jpg|jpeg|png|gif)$/i)) {
            //         formIsValid = false;
            //         errors['file'] = 'File is not valid, must be an image';
            //     }
            // }
            return null
        })
        setState({...state, errors: errors});
        return formIsValid;
    }

    //Form
    return <div className="form-class p-4 w-full">
        <h1 className={'ml-4 border-b border-black w-max'}>{form_title}</h1>
        <form className={'border-l  border-black'}>
            {formFields}
            <div className="form-input-group border-t border-black">
                <button className={'hover:text-amber-700'}
                        onClick={(event: React.MouseEvent<Element, MouseEvent>) => handleSubmit(event)}
                        type="submit">{submitText}</button>
                <button className={'hover:text-amber-700'} onClick={handleValidation} type="button">validate
                </button>
            </div>
        </form>
    </div>


}


export default CustomForm
