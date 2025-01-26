import { body, validationResult } from "express-validator";
import { MQ } from "../../common";
import { MODAL } from "../../constant";
import fs from 'fs';    
import path from 'path';  
import CategoryIn from "../../interface/Category.interface";
const reqEditCategoryValidation = [
    body("categoryId").notEmpty().withMessage("place enter categoryId"),
    body("categoryName")
        .notEmpty().withMessage("category name is required")
        .custom(async(value,{req}) => {
            const categoryData:any = await MQ.findOne<CategoryIn>(MODAL.CATEGORY_MODAL, { categoryName: value });
            if (categoryData && categoryData._id != req.body.categoryId) {
                throw new Error("category name is already in use");
            }
        }),
    body("editor")
    .notEmpty().withMessage("creator name is required"),
    (req: any, res: any, next: any) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            if (req.file) {   
                const imagePath = process.env.CATEGORY_IMAGE_PATH || '/upload/categoryImage';
                let img = path.join(__dirname, '../..', imagePath, req.file.filename);
                if (img && fs.existsSync(img)) {
                    fs.unlinkSync(img)
                }
            }
            return res.status(400).json({success:false, error: error.array() });
        }
        return next();
    }
]
export default reqEditCategoryValidation;