import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";


interface CustomFormProps {
    fields: CustomFormField[],
    form_title: string,
    form_method: string,
    form_action: string
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

interface formFieldInterface {
    [key: string]: string
}

interface formDataInterface {
    [key: string]: string | File
}


const CustomForm = ({fields, form_title, form_method, form_action}: CustomFormProps) => {

    const [formData, setFormData] = useState({} as formDataInterface);
    const [state, setState] = useState({fields: {} as formFieldInterface, errors: {} as formErrorInterface})
    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
        setState({...state, fields: {...state.fields, [name]: value}})

    }
    const handleSubmit = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        if (handleValidation()) {
            form_method === 'post' && axios.post(form_action, formData)
                .then((res: AxiosResponse<any>) => {
                    const {data} = res;
                    res.status === 200 && console.log(data);
                })
            alert("Form submitted");
        } else {
            alert("Form has errors.");
        }
    }
    //
    //

    const setErrorClass= (field: string) => {
        return state.errors[field] ? 'border border-red-600' : '';
    }

    const handleValidation = () => {
        let fields = state.fields;
        let errors = {} as formErrorInterface;
        let formIsValid = true;
        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }
        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }
        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");
            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
                formIsValid = false;
                errors["password"] = "Password is not valid. Password must be at least 8 characters long and contain at least one letter and one number";
            }
        }
        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "Enter password again for confirmation!";
        }
        if (typeof fields["confirmPassword"] !== "undefined") {
            if (fields["confirmPassword"] !== fields["password"]) {
                formIsValid = false;
                errors["confirmPassword"] = "Passwords do not match!";
            }
        }
        setState({...state, errors: errors});
        return formIsValid;
    }

    let submitText: String | undefined = 'Submit';
    const formFields = fields.map((field: CustomFormField, index: any) => {
        if (field.name === 'submit') {
            submitText = field.value;
            return <></>
        } else if (field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'textarea') {
            return <div key={index} className="form-input-group border-black border-r" >
                <label key={field.name} htmlFor={field.name.toLowerCase()}>{field.name}</label>
                {state.errors[field.name] && <span className="error text-xs ">{state.errors[field.name]}</span>}
                <input key={field.placeholder} className={setErrorClass(field.name)}  type={field.type} name={field.name}
                       placeholder={field.placeholder || ''} onChange={(e: any) => handleChange(e)}/>
            </div>
        } else if (field.type === 'image') {
            return <div className="form-input-group border-black border-r" key={index}>
                <img className={'w-12 h-12 '} key={field.placeholder} alt={field.placeholder} src={field.value}/>
                {state.errors[field.name] && <span key={state.errors[field.name]} className="error">{state.errors[field.name]}</span>}

            </div>
        } else if (field.type === 'file') {
            return <div className="form-input-group border-black border-r flex-wrap" key={index}>
                <label key={field.name} htmlFor={field.name}>{field.name}</label>
                <input key={field.placeholder} className={'w-4/12'} name={field.name} type={field.type}
                       onChange={(e: any) => handleChange(e)}
                       placeholder={field.placeholder}/>
                {state.errors[field.name] && <span key={state.errors[field.name]}  className="error">{state.errors[field.name]}</span>}

            </div>
        } else return <></>

    })
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
