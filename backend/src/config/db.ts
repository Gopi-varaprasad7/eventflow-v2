import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error", error);
        process.exit(1);
    }
};