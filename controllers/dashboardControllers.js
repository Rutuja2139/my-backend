import * as XLSX from 'xlsx';
import File from '../models/fileModel.js';
import User from '../models/userModel.js';
// import cloudinary from '../utils/cloudinaryConfig.js';
// import { PassThrough } from 'stream';

const dashboardgetController = async (req,res)=>{
    try{
        const user = await User.findById(req.userData.userData.user).select('name')
        
        res.status(200).json({success:true, message:"authorized", name: user.name})
    }catch(err){
        console.log(err);
    }
    
}

const dashboardpostController = async(req,res)=>{
    console.log(req.file);
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    const columnWiseData = {};
    jsonData.forEach(row => {
    Object.entries(row).forEach(([key, value]) => {
        if (!columnWiseData[key]) {
        columnWiseData[key] = [];
        }
        columnWiseData[key].push(value);
    });
    });

    console.log(columnWiseData);
    const noOfColumn = Object.keys(columnWiseData).length
    const firstKey = Object.keys(columnWiseData)[0];
    const firstArrayLength = columnWiseData[firstKey]?.length;
    const noOfRow = firstArrayLength;
    const colArr = Object.keys(columnWiseData)
    const userId = req.userData.userData.user;
    const fileName = req.file.originalname;
    // console.log(noOfRow);
    // console.log(noOfColumn)
     console.log(colArr)
    // console.log(req.userData.userData.user)
    
    let answer;
    try{
        const newFile = new File({fileName, noOfRow, noOfColumn, colArr, userId })
        answer = await newFile.save()
        console.log(answer)
    }catch(err){
        console.log(err);
    }

    res.json({
      message: 'File processed successfully',
      filedata: answer,
      excelData: columnWiseData,
    });

    
}


export {dashboardgetController, dashboardpostController}


//     const result = await new Promise((resolve, reject) => {
    //         const stream = cloudinary.uploader.upload_stream(
    //                 { resource_type: 'raw', folder: 'excel-uploads', public_id: req.file.originalname.replace(/\.[^/.]+$/, '') },
    //                 (err, result) => {
    //                     (err ? reject(err) : resolve(result))
    //                 }
    //         );
            
    //         const bufferStream = new PassThrough();
    //         bufferStream.end(req.file.buffer);
    //         bufferStream.pipe(stream);
    //     });
    //     console.log(result);

    // }catch(err){
    //     console.error(err);
    // }