import { Response, Request } from 'express';
import cloudinary from '../../config/cloudinary';
import fs from "fs";
import path from "path";

export const imageUpload = async (req: Request, res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "Please upload a file"});
        }
        const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
    console.log('File path:', filePath);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "linkr",
        });
        fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Upload successful',
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
      
          console.error('Upload error:', error);
          res.status(500).json({
            message: 'Error uploading file',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
    }
}