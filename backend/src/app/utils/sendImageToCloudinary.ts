import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_serect,
});

export const sendImageToCloudinary = (
  imgName: string,
  path: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imgName },
      function (error, result: UploadApiResponse | undefined) {
        if (error) {
          reject(error);
        } else {
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Upload result is undefined'));
          }
          // delete a file
          fs.unlink(path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted');
            }
          });
        }
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
