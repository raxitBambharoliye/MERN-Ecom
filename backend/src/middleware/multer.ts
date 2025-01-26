import multer from "multer";
import path from 'path'
const imgObj = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname == 'profile'){
            cb(null, path.join(__dirname, '..' +process.env.PROFILE_PATH));
        }else if(file.fieldname == 'userProfile'){
            cb(null, path.join(__dirname, '..' + process.env.USER_PROFILE_PATH));
        }else if(file.fieldname == 'categoryImage'){
            cb(null, path.join(__dirname, '..' + process.env.CATEGORY_IMAGE_PATH));
        } else if (file.fieldname == "bannerImage") {
            cb(null, path.join(__dirname, '..' + process.env.PRODUCT_BANNER_IMAGE_PATH));
        } else if (file.fieldname == 'mulImage') {
            cb(null, path.join(__dirname, '..' + process.env.PRODUCT_MUL_IMAGE_PATH));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Math.ceil(Math.random()*9999999));
    }
});


export const upLoadImage = multer({ storage: imgObj });
