import { Router } from "express";
import { editProfile, UserAddContact, UserLogin, UserRegister } from "../controller/userController/user.controller";
import { reqAddContactValidation, reqEditProfileValidation, reqLoginValidation, reqRegisterValidation } from "../validation/reqValidation";
import { upLoadImage } from "../middleware/multer";

const router = Router();

router.post('/register', reqRegisterValidation ,UserRegister);
router.post('/login', reqLoginValidation, UserLogin);

router.post('/addContact', reqAddContactValidation, UserAddContact);
router.post("/editProfile",upLoadImage.single("userProfile"),editProfile);
export{ router as userRouter};