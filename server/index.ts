/** @format */

import { connectDB } from './database/connect_db';
import authMiddleware from './utils/auth.middleware';
// import headers from "./utils/headers.middleware";

const express = require('express');
const formidable = require('express-formidable');
const cors = require('cors');
const dotenv = require('dotenv')
const loginRouter = require('./api/routes/auth.route');
const blogRouter = require('./api/routes/blog.route');
dotenv.config()
const app = express();
app.use(formidable());
app.use(cors());
// app.use(headers)
app.use('/api/log', loginRouter);
app.use('/api/blog', blogRouter);
app.use('/api/profile',authMiddleware, require('./api/routes/profile.route').profileRouter);
app.use('/api/spotify', require('./api/routes/spotifyApi.auth.route').spotifyRouter);
app.use('/', (req: any, res: any) => {
  res.send('Portfolio Backend Server');
});

app.use('/api/hello', (req: any, res: any) => {
  res.json({message: 'Hello World!'});
});
app.get('/profile', (req: any, res: any) => {
  res.send('Profile');
});
const port = process.env.PORT;
app.listen(port, function () {
  connectDB();
  console.log(`App listening on http://localhost:${port}`);
});
