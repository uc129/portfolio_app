/** @format */

import CustomForm from '../customForm';

export const SignupSection = () => {
  const form_fields = [
    {type:'image',name:'image',placeholder: 'signup image',value:'https://avatars.githubusercontent.com/u/42912083?v=4'},
    { type: 'text', name: 'name', placeholder: 'Utkarsh' },
    { type: 'email', name: 'email', placeholder: 'uc129@gmail.com' },
    { type: 'password', name: 'password', placeholder: 'Password' },
    {
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirm-Password',
    },
    { type: 'file', name: 'profilePic', value: 'ProfilePic', placeholder: 'Choose avatar' },
    { type: 'text', name: 'profession', placeholder: 'Web Developer' },
    { type: 'submit', name: 'submit', value: 'Sign Up' },

  ];

  return (
    <CustomForm
      fields={form_fields}
      form_title={'Sign Up Form'}
      form_method={'post'}
      form_action={'http://localhost:5000/api/blog/signup'}
    />
  );
};
