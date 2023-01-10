
import {User} from "../database/models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthService{
    private error: string | undefined;
    private new_user: any;
    private token:any
    private compare: boolean;

    constructor() {
        this.error = undefined;
        this.compare = false;
        this.new_user = undefined;
        this.token=undefined
    }



     generateToken = async (id:any) => {
        return jwt.sign(id, process.env.JWT_SECRET as string, {
            algorithm: "HS256",
            expiresIn: "30d",
        })
    }

    async loginfn(formData: any) {
        // let check = checkAuth();
        const {email,password}=formData
        const user=await User.findOne({email:email}).then(res=>res)
        console.log('found user',user)
        if(!user) this.error='Login: User not found'
        else if (user && user.password) {
            await bcrypt.compare(password, user.password)
                .then((res) => (this.compare = res)).catch((err) => (this.error = 'Password error'+err));
            this.compare && (this.token = await this.generateToken({id: user.id}))
        }
        if (this.error){
            console.log('login error',this.error)
            return {error: this.error}
        }
        else
            return {token:this.token, user:{id:user?.id,name:user?.name,email:user?.email}, login:this.compare};
    }

    hashPassword = async (password: string) => {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds).then((hash: any) => hash);
    };

    async signup (user_data: any) {
        let error: string | undefined = undefined;
        let new_user: any;
        let token: any;
        let hash:any;
        const userExists= await User.findOne({email:user_data.email})
        userExists && (error='User already exists')
        if(!user_data.password || !user_data.email || !user_data.confirmpassword){
            error='Incomplete Information'
        }
        if (!userExists  && user_data.password === user_data.confirmpassword) {
            delete user_data.confirmpassword;
            hash = await this.hashPassword(user_data.password);
            hash ? user_data.password=hash:error='Passwords do not match!'
        }
        (!error && hash) && await User.create(user_data)
            .then((res: any) => new_user = res)
            .catch((err: any) => error = err);

        new_user && (token=await this.generateToken({id:new_user.id}))
        console.log( {token:token,user:new_user,error:error})
        return {token:token,user:new_user,error:error}

    }

    async logout (req: any, res: any){
        try {
            req.user = undefined;
            res.json({logout:true})
            console.log('logout: true')
        } catch (error) {
            res.json(error)
        }
    }
}
