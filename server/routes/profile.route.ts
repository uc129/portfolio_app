

const router = require('express').Router();

import ProfileService from '../service/profile.service';

const service = new ProfileService()


router.get(`/user/:id`, async (req: any, res: any) => {
    const {id} = req.params;
    let profile= await service.getProfileByUserId(id).then(r=>r);  //
    console.log('profile: ', profile)
    profile ? res.send(profile) : res.send('Error getting profile');
})
router.post('/create-profile', async (req: any, res: any) => {
    // const {userId} = req.params;
    let formData = req.fields;
    let user= req.user;
    console.log('Profile formData: ', formData,user)
    if(!formData){
        console.log('Error receiving form data');
        res.status(400).send('Error receiving form data')
        return
    }
    let newProfile;
    formData&& await service.createProfile(formData,user).then((profile: any) => newProfile = profile);
    // @ts-ignore
    console.log(newProfile);
    newProfile? res.status(200).send('Profile Created'): res.status(400).send('Error creating profile');

})
router.post('/update-profile', async (req: any, res: any) => {
    // const {userId} = req.params;
    let formData = req.fields;
    if(!formData){
        console.log('Error receiving form data');
        res.status(400).send('Error receiving form data')
        return
    }

    // !formData.summary && (formData.summary = 'No summary provided');
    // !formData.image && (formData.image = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png');

    // if (formData.owner !== req.user.id){
    //     console.log('User not authorized');
    //     res.status(401).send('User not authorized');
    //     return
    // }
    //  if(!formData.name){
    //     console.log('Incomplete form data');
    //     res.status(400).send('Incomplete form data');
    //     return
    // }
    let newProfile;
    formData&& await service.updateProfile(formData).then((profile: any) => newProfile = profile);
    // @ts-ignore
    console.log(newProfile?.message, newProfile?.profile);
    newProfile? res.status(200).send('Profile Created'): res.status(400).send('Error creating profile');

})


export { router as profileRouter };
