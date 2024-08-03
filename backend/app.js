import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comments.js';
import upload from './middlewares/upload.js';

dotenv.config();

const app = express();

// middlewares
app.use(cors({
    origin: 'https://blog-application-client-eight.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use('/images', express.static(path.join(path.resolve(), 'images')));
app.use(cookieParser());

// routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('Image has been uploaded successfully!');
})

export default app;
