// import {User} from "../database/models/userSchema";
import {Profile} from "../database/models/profile.model";

class ProfileService {
    async getProfileByUserId(id: string) {
        return await Profile.find({owner: id}).then((res: any) => res)
    }

    async createProfile(formData: any, user:any) {
        const {name,image, summary} = formData;
        const newProfileData = {
            name: name,
            image: image,
            summary: summary,
            owner: user
        }
        return await Profile.create(newProfileData)
            .then((res: any) => res)
            .catch((err: any) => console.log('profile create error: ', err))
    }

   async updateProfile(formData: any) {
        const {name,image, summary, owner} = formData;
        console.log(name,image, summary, owner)
        let profile= await Profile.findOne({owner: owner}).then((res: any) => res);
        console.log('Profile found : ', profile)
        if(!profile){
            console.log('No profile found, creating new profile');
            let newProfile = await this.createProfile(formData,owner);
            return {profile:newProfile, message: 'No Profile Found! New Profile Created'}
        }
        else {
            let newProfileData = {
                name: '',
                image:'',
                summary: '',
            }
            name && (newProfileData.name = name);
            image && (newProfileData.image = image);
            summary && (newProfileData.summary = summary);
            console.log('newProfileData: ', newProfileData)
            let updatedProfile = await Profile.findOneAndUpdate({owner}, newProfileData).then(r=>r)
            return {profile:updatedProfile, message: 'Profile Updated'}
        }

    }
}

export default ProfileService;

