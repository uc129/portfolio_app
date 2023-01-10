 import CustomForm, {CustomFormField} from "../utils/customForm";

export const SignupSection = () => {
  const form_fields: CustomFormField[] = [
    {type:'image',name:'image',placeholder: 'signup image',value:'https://avatars.githubusercontent.com/u/42912083?v=4'},
    { type: 'text', name: 'name', placeholder: 'Utkarsh' },
    { type: 'email', name: 'email', placeholder: 'uc129@gmail.com', required: true },
    { type: 'password', name: 'password', placeholder: 'Password', required: true  },
    {
      type: 'password',
      name: 'confirmpassword',
      placeholder: 'Confirm-Password',
      required: true
},
    { type: 'file', name: 'profilePic', value: 'ProfilePic', placeholder: 'Choose avatar' },
    { type: 'text', name: 'profession', placeholder: 'Web Developer' },
    { type: 'submit', name: 'submit', value: 'Sign Up' },

  ];





  return (
    <CustomForm
      fields={form_fields}
      form_title={'Sign Up Form'}
      type={'register'}
      // retrieveFormData={(data) => setFormData(data)}
    />
  );
};
