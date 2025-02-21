import multer from "multer";
import {Request} from "express";
import path from "path"



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Use single absolute path
      const uploadDir = path.join(process.cwd(), 'uploads');
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Remove spaces from filename
      const fileName = file.originalname.replace(/\s+/g, '_');
      cb(null, `${Date.now()}_${fileName}`);
    }
  });

interface MulterFile extends Express.Multer.File {
    mimetype: string;
}

const fileFilterFn = function(req: Request, file: MulterFile, cb: multer.FileFilterCallback) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Only ${allowedTypes.join(", ")} are allowed.`));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilterFn,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})