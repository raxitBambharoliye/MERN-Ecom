import { Router } from "express";
import { userRouter } from "./user.router";
import { reqAddAdminVAlidation, reqAddCategoryValidation, reqAddProductValidation, reqEditCategoryValidation, reqLoginValidation } from "../validation/reqValidation";
import { AdminActive, AdminAdd, AdminAllAdminData, AdminDelete, AdminEditProfile, AdminLogin, activeUser, addUser, allUserData, deleteUser, editUser } from "../controller/adminController/admin.controller";
import { upLoadImage } from "../middleware/multer";
import reqEditAdminProfileValidation from "../validation/reqValidation/rea.editAdminProfile.vaidation";
import authToken from "../common/authToken";
import { activeCategory, addCategory, allCategory, deleteCategory, editCategory } from "../controller/adminController/cetogry.controller";
import { reqAddUserValidation } from "../validation/reqValidation/req.addUser.validation";
import { activeProduct, addProduct, allProduct, deleteProduct, editProduct, inStockProduct } from "../controller/adminController/product.controller";
import { frontRouter } from "./front.router";

const router = Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
})
router.post("/login", reqLoginValidation, AdminLogin)

router.post('/addAdmin', authToken,upLoadImage.single("profile"),reqAddAdminVAlidation, AdminAdd)
router.post('/editAdminProfile',authToken,upLoadImage.single("profile"),reqEditAdminProfileValidation,AdminEditProfile)
router.get('/allAdmin/:page/:limit/', authToken, AdminAllAdminData);


router.delete('/deleteAdmin/:id/:page/:limit/',authToken,AdminDelete)
router.get('/activeAdmin/:id/:page/:limit/',authToken,AdminActive)


router.post('/addCategory',authToken, upLoadImage.single('categoryImage'),reqAddCategoryValidation, addCategory);
router.get('/allCategory/:page/:limit/',authToken,allCategory)
router.get('/activeCategory/:id/:page/:limit/',authToken,activeCategory)
router.delete('/deleteCategory/:id/:page/:limit/',authToken,deleteCategory)
router.post('/editCategory', authToken, upLoadImage.single('categoryImage'), reqEditCategoryValidation, editCategory);


router.get('/allUser/:page/:limit/', authToken, allUserData);
router.post('/addUser',authToken,upLoadImage.single('userProfile'), reqAddUserValidation,addUser)
router.get('/activeUser/:id/:page/:limit/',authToken,activeUser)
router.delete('/deleteUser/:id/:page/:limit/',authToken,deleteUser)
router.post("/editProfile",authToken,upLoadImage.single("userProfile"),editUser);


router.post("/addProduct",authToken,upLoadImage.fields([{name:"bannerImage",maxCount:1},{name:"mulImage"}]),reqAddProductValidation,addProduct)
router.get('/activeProduct/:id/:page/:limit/',authToken, activeProduct)
router.get('/inStockProduct/:id/:page/:limit/',authToken, inStockProduct)
router.delete('/deleteProduct/:id/:page/:limit/',authToken, deleteProduct)
router.get('/allProduct/:page/:limit/',authToken, allProduct)
router.post("/editProduct",authToken,upLoadImage.fields([{name:"bannerImage",maxCount:1},{name:"mulImage"}]),editProduct);


router.use('/user', userRouter);
router.use('/frontend',frontRouter)

export default router;