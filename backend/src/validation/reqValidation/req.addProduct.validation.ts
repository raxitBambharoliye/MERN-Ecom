import { body, validationResult } from "express-validator";
import path from 'path'
import fs from 'fs';

const reqAddProductValidation = [
    body('name')
        .notEmpty().withMessage("name is required"),
    body('description')
        .notEmpty().withMessage("description is required"),
    body("price")
        .notEmpty().withMessage("price is required"),
    body("discount")
        .notEmpty().withMessage("discount is required")
        .isInt({ max: 100, min: 0 }).withMessage("enter valid discount"),
    body("stock")
        .notEmpty().withMessage("stock is required"),
    body("inStock")
        .notEmpty().withMessage("inStock is required")
       /*  .isBoolean().withMessage("enter valid type of inStock") */,
    body("isActive")
        .notEmpty().withMessage("isActive is required")
       /*  .isBoolean().withMessage("enter valid type of isActive") */,
    body("categoryId")
        .notEmpty().withMessage("category is required"),
    body("creator")
        .notEmpty().withMessage("creator is required"),
    (req: any, res: any, next: any) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
        
            if (req.files) {
                if (req.files.bannerImage[0]) {
                    const imagePath = process.env.PRODUCT_BANNER_IMAGE_PATH || '/upload/productBanner';
                    let img = path.join(__dirname, '../..', imagePath, req.files.bannerImage[0].filename);
                    if (img && fs.existsSync(img)) {
                        fs.unlinkSync(img)
                    }
                }
                if (req.files.mulImage && req.files.mulImage.length > 0) {
                    const imagePath = process.env.PRODUCT_MUL_IMAGE_PATH || '/upload/productMulti';
                    req.files.mulImage.forEach((element: any) => {
                        const img = path.join(__dirname, '../..', imagePath, element.filename)
                        if (img && fs.existsSync(img)) {
                            fs.unlinkSync(img);
                        }
                    });
                }
            }
            return res.status(400).json({
                success: false,
                error: error.array()
            });
        }
        return next();
    }
]
export default reqAddProductValidation;