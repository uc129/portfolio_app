import CustomForm, {CustomFormField} from "../customForm";
// import {useContext} from "react";
//
// import Auth1Context from "../../context/Auth1Context";
// // import useAuth from "../../utils/AuthHook";

const Login = () => {

     const form_fields:CustomFormField[] = [
         { type: 'email', name: 'email', placeholder: 'uc129@gmail.com', required: true },
         { type: 'password', name: 'password', placeholder: 'Password', required: true },
         { type: 'submit', name: 'submit', value: 'Log In' },
     ];
    // let context= useContext(Auth1Context);


    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    //
    // useEffect(() => {
    //     setIsAuthenticated(context.isAuthenticated);
    // }, [context]);

    // isAuthenticated && navigate('/')

        return (
            <CustomForm
                fields={form_fields}
                form_title={'Login Form'}
                type={'login'}

            />
        )


}

 export default Login
