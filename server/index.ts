/** @format */

import { connectDB } from './database/connect_db';
import authMiddleware from './utils/auth.middleware';
// import headers from "./utils/headers.middleware";

const express = require('express');
const formidable = require('express-formidable');
const cors = require('cors');
const dotenv = require('dotenv')
const loginRouter = require('./routes/auth.route');
const blogRouter = require('./routes/blog.route');
dotenv.config()
const app = express();
app.use(formidable());
app.use(cors());
// app.use(headers)
app.use('/api/log', loginRouter);
app.use('/api/blog',authMiddleware, blogRouter);
app.use('/api/profile',authMiddleware, require('./routes/profile.route').profileRouter);
app.use('/api/spotify', require('./routes/spotifyApi.auth.route').spotifyRouter);
app.use('/', (req: any, res: any) => {
  res.send('Portfolio Backend Server');
});
app.get('/profile', (req: any, res: any) => {
  res.send('Profile');
});
const port = process.env.PORT;
app.listen(port, function () {
  connectDB();
  console.log(`App listening on http://localhost:${port}`);
});
