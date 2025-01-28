import { body, validationResult } from "express-validator";
import { MQ } from "../../common";
import { MODAL } from "../../constant";

const reqAddProductReviewValidation = [
  body("userId")
    .notEmpty()
    .withMessage("user Id is required")
    .custom(async (value) => {
      const userData: any = await MQ.findById(MODAL.USER_MODAL, value);
      if (!userData) {
        throw new Error("un valid user ");
      }
    }),
  body("reviewMessage").notEmpty().withMessage("review Message is required"),
  body("productId")
    .notEmpty()
    .withMessage("Product Id is required")
    .custom(async (value,{req}) => {
      const productData: any = await MQ.findById(MODAL.PRODUCT_MODAL, value);
      if (!productData) {
        throw new Error("envalid product data");
      }
      const reviewData: any = await MQ.find(MODAL.PRODUCT_REVIEW_MODAL, { userId: req.body.userId, productId: value });
      if (reviewData && reviewData.length > 0) { 
        throw new Error("you already review this product");
      }
    }),
  body("rating")
    .notEmpty()
    .withMessage("rating is required")
    .custom((value) => {
      if (+value < 1 || +value > 5) {
        throw new Error("rating should be between 1 to 5");
      }
      return true;
    }),

  (req: any, res: any, next: any) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: error.array(),
      });
    }
    return next();
  },
];
export default reqAddProductReviewValidation;
