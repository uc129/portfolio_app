import jwt from "jsonwebtoken";
import {User} from "../database/models/userSchema";
import asyncHandler from 'express-async-handler';


const auth = asyncHandler(async (req: any, res: any, next: any) => {
let token
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log('decoded',decoded)
        // @ts-ignore
        req.user = await User.findById(decoded.id).select('-password') // exclude the password from response
        console.log('req.user',req.user)
        next()
    } catch (error) {
        console.error(error)
        res.status(401).send('Not Authorized')
        return
    }
}
    else if (!token) {
        console.error('Not Authorized, no token')
        res.status(401).send('Not Authorized, no token')
        return
    }

})

export default auth;
