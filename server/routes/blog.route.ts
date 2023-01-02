const router = require('express').Router();

router.post('/new/create-post', async (req: any, res: any) => {
    const formData = req.fields.data;
    !formData && res.send('Error receiving form data');
    !formData && console.log('Error receiving form data');
    console.log(formData);
    res.send(formData);
})

module.exports= router;
export{}




