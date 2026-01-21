import express from 'express';
import cors from 'cors'
import  AllRoutes  from './routes/AllRoutes.js';
import connectDB from './models/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
connectDB();

 app.use('/', AllRoutes);



app.listen(process.env.PORT, ()=>{
    console.log("server connected")
})
