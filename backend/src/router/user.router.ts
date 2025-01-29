import { Router } from "express";
import { addProductReview, addUserAddress, deleteUserAddress, editProfile, editUserAddress, UserAddContact, UserLogin, UserRegister } from "../controller/userController/user.controller";
import { reqAddContactValidation, reqEditProfileValidation, reqLoginValidation, reqRegisterValidation,reqAddProductReviewValidation, reqAddAddressValidation, reqEditAddressValidation } from "../validation/reqValidation";
import { upLoadImage } from "../middleware/multer";
import { userAuthToken } from "../common/authToken";

const router = Router();

router.post('/register',  upLoadImage.single("userProfile"),reqRegisterValidation ,UserRegister);
router.post('/login', reqLoginValidation, UserLogin);

router.post('/addContact', userAuthToken,reqAddContactValidation, UserAddContact);
router.post("/editProfile",userAuthToken ,upLoadImage.single("userProfile"), editProfile);
router.post("/addProductReview", userAuthToken,reqAddProductReviewValidation, addProductReview);
router.post('/addAddress',userAuthToken ,reqAddAddressValidation, addUserAddress);
router.post('/editAddress', userAuthToken,reqEditAddressValidation, editUserAddress);
router.get('/deleteAddress/:id',userAuthToken,deleteUserAddress)
export{ router as userRouter};