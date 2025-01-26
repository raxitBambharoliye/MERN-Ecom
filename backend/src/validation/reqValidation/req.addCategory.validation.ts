import { body, validationResult } from "express-validator";
import { MQ } from "../../common";
import { MODAL } from "../../constant";
import fs from 'fs';    
import path from 'path';  
const reqAddCategoryValidation = [
    body("categoryName")
        .notEmpty().withMessage("category name is required")
        .custom(async(value) => {
            const categoryData = await MQ.find(MODAL.CATEGORY_MODAL, { categoryName: value });
            if (categoryData && categoryData.length > 0) {
                throw new Error("category name is already in use");
            }
        }),
    body("creator")
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
export default reqAddCategoryValidation;