import { body, validationResult } from "express-validator";
import { MQ } from "../../common";
import { MODAL } from "../../constant";

const reqEditAddressValidation = [
  body("userId")
    .notEmpty()
    .withMessage("user not found")
    .custom(async (value) => {
      const data: any = await MQ.findById(MODAL.USER_MODAL, value);
      if (!data) {
        throw new Error("user not found");
      }
    }),
  body("id")
    .notEmpty()
    .withMessage("record not found")
    .custom(async (value) => {
      const data: any = await MQ.findById(MODAL.ADDRESS_MODAL, value);
      if (!data) {
        throw new Error("record not found");
      }
    }),
  body("pinCode").notEmpty().withMessage("pin code is required").isLength({ min: 6 }).withMessage("PNI code must be  6 digits"),
  body("city").notEmpty().withMessage("city is required"),
  body("state").notEmpty().withMessage("state is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("address1").notEmpty().withMessage("address is required"),
  body("title").notEmpty().withMessage("address title is required"),
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
export default reqEditAddressValidation;
