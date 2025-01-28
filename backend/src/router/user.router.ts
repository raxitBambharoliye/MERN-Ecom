import { Router } from "express";
import { addProductReview, editProfile, UserAddContact, UserLogin, UserRegister } from "../controller/userController/user.controller";
import { reqAddContactValidation, reqEditProfileValidation, reqLoginValidation, reqRegisterValidation,reqAddProductReviewValidation } from "../validation/reqValidation";
import { upLoadImage } from "../middleware/multer";

const router = Router();

router.post('/register',  upLoadImage.single("userProfile"),reqRegisterValidation ,UserRegister);
router.post('/login', reqLoginValidation, UserLogin);

router.post('/addContact', reqAddContactValidation, UserAddContact);
router.post("/editProfile", upLoadImage.single("userProfile"), editProfile);
router.post("/addProductReview",reqAddProductReviewValidation,addProductReview);
export{ router as userRouter};