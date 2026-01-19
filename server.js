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

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.status(200).json({success:true})
// })

// app.post('/', upload.single('excelFile') ,(req,res)=>{
//     console.log(req.file);
//     res.status(200).json({'success': true, 'data': 'connected to backend'})
// })

app.listen(process.env.PORT, ()=>{
    console.log("server connected")
})