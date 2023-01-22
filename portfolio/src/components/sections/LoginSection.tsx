
//

import CustomForm, {CustomFormField} from "../utils/customForm";

const LoginSection = () => {

     const form_fields:CustomFormField[] = [
         { type: 'email', name: 'email', placeholder: 'uc129@gmail.com', required: true },
         { type: 'password', name: 'password', placeholder: 'Password', required: true },
         { type: 'submit', name: 'submit', value: 'Log In' },
     ];

        return (
            <CustomForm
                fields={form_fields}
                form_title={'LoginSection Form'}
                type={'login'}
            />
        )


}

 export default LoginSection
