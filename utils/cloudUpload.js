const cloudUpload = async (fileBuffer)=> {
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', folder: 'excel-uploads' },
                (err, result) => {
                    (err ? reject(err) : resolve(result))
                }
        );
        
        const bufferStream = require('stream').PassThrough();
        bufferStream.end(fileBuffer);
        bufferStream.pipe(stream);
    });
}
export default cloudUpload