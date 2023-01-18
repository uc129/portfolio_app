import {User} from "../database/models/userSchema";

const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");


const auth = asyncHandler(async (req: any, res: any, next: any) => {
    let token
    console.log('#Auth Middleware:-')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let decoded: any
        try {
            token = req.headers.authorization.split(' ')[1]
            if (token) {
                decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log('decoded: ', decoded)
                req.user = await User.findById(decoded.id).select('-password')
                console.log('req.user: ', req.user)
                next()
            }

    } catch (error) {
            console.error('Not Authorized, no token')
             res.status(401)
        }
        return
    }

})

export default auth;
