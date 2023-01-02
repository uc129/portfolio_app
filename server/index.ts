// import {connectDB} from "./database/connect_db";
export {}
const express = require('express');
// const {auth, requiresAuth} = require('express-openid-connect');
const formidable = require('express-formidable');
const cors = require('cors');
const dotenv = require('dotenv').config();
const loginRouter = require('./routes/sign.route')
const blogRouter = require('./routes/blog.route')

const app = express();
app.use(formidable());
app.use(cors())
app.use('/api/log', loginRouter);
app.use('/api/blog', blogRouter);
app.use('/', (req: any, res: any) => {
    res.send('Portfolio Backend Server')
})
app.get('/profile', (req: any, res: any) => {
    res.send('Profile');
});

app.listen(5000, function () {
    // connectDB().then(() => console.log('Connected to MongoDB'))
    console.log('Listening on http://localhost:5000');
});
