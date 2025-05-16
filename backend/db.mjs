import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DSN);
      console.log('DB connected');
    } catch (err) {
      console.error('DB connection error:', err);
      process.exit(1);
    }
  };
  
  export default connectDB;