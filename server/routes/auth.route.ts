/** @format */
import AuthService from "../service/auth.service";
const router = require('express').Router();
const service = new AuthService()


router.post('/register', async (req: any, res: any) => {
    const formData = req.fields;
    !formData && (res.send('Error receiving form data') && console.log('Error receiving form data'));
     formData && res.json( await service.signup(formData).then(res=>res));
});
router.post('/login', async (req: any, res: any, next: any) => {
    const formData = req.fields;
    console.log('login formData', formData)
    if (!formData) {
        res.send('Error receiving form data');
        next()
    }
    res.json(await service.loginfn(formData).then(res=>res));
})

router.get('/get-user', async (req: any, res: any) => {
     res.send(req.user)
})

router.post('/logout', async (req: any, res: any) => {
    await service.logout(req, res);
});

module.exports = router;
