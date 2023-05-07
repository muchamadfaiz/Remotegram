import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { MONGODB_URI } from '../config/config.js';

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.log('Error on initial connection:', err);
    }
};

export { connectDB }