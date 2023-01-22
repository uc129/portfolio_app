 import CustomForm, {CustomFormField} from "../utils/customForm";
 import axios from "axios";
 import {useEffect, useState} from "react";

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
  const [registerRes, setRegisterRes] = useState(false)
  const [profileRes, setProfileRes] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        profilePic: '',
        profession: '',
    })

  useEffect(()=>{
    registerRes && createProfile()
    // profileRes && console.log('profile res',profileRes)
    profileRes && (window.location.href = '/')

  },[registerRes])


  const createProfile = () => {
    let token = localStorage.getItem('token')
    let user = JSON.parse(localStorage.getItem('user') as string)
    token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);

    let profileData={
      name: formData.name,
      image: 'https://avatars.githubusercontent.com/u/42912083?v=4',
      summary: 'Profile for User'+user?.name,
      // owner: user?._id,
    }
    axios.post('http://localhost:5000/api/profile/create-profile',profileData)
        .then(() => setProfileRes(true))
        .catch((err: any) => console.log(err))

  }


  function handleRegisterSuccess(data: any) {
    setRegisterRes(data)
    createProfile()
  }

  return (
    <CustomForm
      fields={form_fields}
      form_title={'Sign Up Form'}
      type={'register'}
      retrieveSuccess={(data) => handleRegisterSuccess(data)}
      retrieveFormData={(data) => setFormData(data)}
    />
  );
};
