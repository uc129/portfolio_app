import CustomForm, {CustomFormField} from "../customForm";
import {useEffect, useState} from "react";
import useAuth from "../../utils/AuthHook";

const Login = () => {
    const context:{ isAuthenticated: boolean; logIn: (email: string, password: string) => Promise<void>; user: null; logOut: () => Promise<void>; register: (data: any) => Promise<void> } = useAuth();
    const [formData, setFormData] = useState({email: '', password: ''});
    useEffect(() => {
        console.log('login form data', formData);
        if(formData.email.length>2 && formData.password.length>2) {
            context.logIn(formData.email, formData.password).then((res: any) => res)
        }
    }, [formData]);



     const form_fields:CustomFormField[] = [
         { type: 'email', name: 'email', placeholder: 'uc129@gmail.com', required: true },
         { type: 'password', name: 'password', placeholder: 'Password', required: true },
         { type: 'submit', name: 'submit', value: 'Log In' },
     ];


        return (
            <CustomForm
                fields={form_fields}
                form_title={'Login Form'}
                type={'login'}
                retrieveAxiosData={(data)=> data && setFormData({email:data.email,password:data.password})}
            />
        )


}

 export default Login
