
import {useContext, useEffect, useState} from "react";
import Auth1Context from "../../../context/Auth1Context";
import axios from "axios";
import CustomForm, {CustomFormField} from "../../utils/customForm";



const UpdateProfile = () => {

    const context = useContext(Auth1Context);
    const {isAuthenticated} = context;
    const [formData, setFormData] = useState({name: '', image: '', summary: ''})
    // const [newProfile, setNewProfile] = useState(null as NewProfileState | null);

    const formFields: CustomFormField[] = [
        {
            name: "name",
            type: "text",
            required: true,
            // @ts-ignore
            value: '',
            placeholder: 'Profile Name'
        },
        {
            name: "summary",
            type: "text",
            // @ts-ignore
            value: '',
            placeholder: 'Profile Summary'
        },
        {
            name: 'image',
            type: 'file',
            // @ts-ignore
            value: '',
        }
    ]

    useEffect(() => {
        let token;
        let newProfileData
        let user = context.user;
        if (formData.name.length>2 && formData.summary.length>2) {
             newProfileData = {
                name: formData.name,
                summary: formData.summary,// @ts-ignore
                owner: user?.id,
                image: ''
            }
            formData.image && (newProfileData.image = formData.image)
        }
        console.log('formData', formData)
        console.log('new Profile',newProfileData)
        console.log('is authenticated',isAuthenticated)
        if (isAuthenticated) {
            token = localStorage.getItem('token')
            console.log('token', token)
            token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);

            newProfileData?.name && newProfileData?.owner && axios.post('http://localhost:5000/api/profile/update-profile', newProfileData)
                .then((res)=>console.log('Profile Create Response',res))
        }
    },[formData,context,isAuthenticated])


    return <>
        {isAuthenticated &&
            <CustomForm fields={formFields} form_title={'Profile'} retrieveFormData={(data) =>setFormData(data)}/>}
    </>
}

export default UpdateProfile
