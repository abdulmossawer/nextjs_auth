import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

let isConnected: mongoose.Mongoose | null = null; // Cached connection

export async function connect() {
    if (isConnected) {
        console.log('Using cached MongoDB connection');
        return isConnected;
    }

    try {
        console.log('Connecting to MongoDB...');
        isConnected = await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
        return isConnected;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Optionally rethrow the error
    }
}

export { mongoose };
