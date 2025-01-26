import { Router } from "express";
import { frontAllCategory, frontAllProduct, frontGetSingleProduct } from "../controller/froentController/front.data.controller";

const router = Router();


router.get('/userAllCategory',frontAllCategory)
router.get('/allProduct',frontAllProduct)
router.get('/singleProduct/:id',frontGetSingleProduct)



export {router as frontRouter}