import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

const app = express();
dotenv.config();

// DB connection
app.use(express.json());
app.use(cookieParser());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute); 
app.use("/api/user", userRoute); 

// response Handler middleWare
app.use((obj, req, res, next)=>{
      const statusCode = obj.status || 500;
      const message = obj.message || "something went wrong";
      return res.status(statusCode).json({
      success: [200,201, 204].some(a=> a=== obj.status)? true: false,
      status: statusCode,
      message: message,
      data: obj.data
         

      });
});



const connectMongoDB = async () => {
      try {
            await mongoose.connect(process.env.MONGO_URL, {

            });
            console.log("Connected to Database!");
      } catch (error) {
            console.error("MongoDB connection error:", error);
      }
};

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
      connectMongoDB();
      console.log(`Server is running on port ${PORT}`);
});
