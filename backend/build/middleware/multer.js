"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upLoadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imgObj = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'profile') {
            cb(null, path_1.default.join(__dirname, '..' + process.env.PROFILE_PATH));
        }
        else if (file.fieldname == 'userProfile') {
            cb(null, path_1.default.join(__dirname, '..' + process.env.USER_PROFILE_PATH));
        }
        else if (file.fieldname == 'categoryImage') {
            cb(null, path_1.default.join(__dirname, '..' + process.env.CATEGORY_IMAGE_PATH));
        }
        else if (file.fieldname == "bannerImage") {
            cb(null, path_1.default.join(__dirname, '..' + process.env.PRODUCT_BANNER_IMAGE_PATH));
        }
        else if (file.fieldname == 'mulImage') {
            cb(null, path_1.default.join(__dirname, '..' + process.env.PRODUCT_MUL_IMAGE_PATH));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Math.ceil(Math.random() * 9999999));
    }
});
exports.upLoadImage = (0, multer_1.default)({ storage: imgObj });
