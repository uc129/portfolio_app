/** @format */

import hashPassword from '../utils/hash';
const router = require('express').Router();


router.post('/signup', async (req: any, res: any) => {
  const formData = req.fields;
  let user_data = formData;
  if (formData.password === formData.confirmpassword) {
    const hashedPassword = await hashPassword(formData.password);
    user_data = { ...user_data, password: hashedPassword ,confirmpassword: hashedPassword };
    delete user_data.confirmpassword;
  }
  console.log('userdata',user_data);
  !formData && res.send('Error receiving form data');
  res.send(formData);
});

router.get('/signup', async (req: any, res: any) => {
  await res.send('Use the form to signup');
});

module.exports = router;
