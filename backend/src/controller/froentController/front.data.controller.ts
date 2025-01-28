import { MQ } from "../../common";
import { MODAL } from "../../constant";
import ProductIn from "../../interface/Product.intereface";
import logger from "../../utility/log"

const frontAllCategory= async (req:any,res:any)=>{
    try {
        let data= await MQ.find(MODAL.CATEGORY_MODAL,{isActive:true});
        if(data){
            res.status(200).json({allCategory:data});
        }
    } catch (error) {
        logger.error(
            `CATCH ERROR : IN : category : frontAllCategory : 🐞🐞🐞 : \n ${error}`
          );
    }
}
const frontAllProduct = async (req: any, res: any) => {
    try {
        let query:any ={ isActive: true };
        if (req.query.singleId) {
            query._id = req.query.singleId;
        }

        let data = await MQ.find(MODAL.PRODUCT_MODAL,query );
        if (data) {
            res.status(200).json({allProducts:data});
        } else {
            res.status(400).json({message:"some thing went wrong, please try again later."})
        }
    } catch (error) {
        logger.error(
            `CATCH ERROR : IN : frontAllProduct :  : 🐞🐞🐞 : \n ${error}`
          );
    }
}

const frontGetSingleProduct = async (req: any, res: any) => {
    try {
        if (!req.prams.id) {
            res.status(400).json({message:"product not found"})
        }
        let productData = await MQ.findById<ProductIn>(MODAL.PRODUCT_MODAL, req.params.id);
        if (productData && productData.isActive) {
            res.status(200).json({productData})
        } else {
            res.status(400).json({message:"some thing went wrong, please try again later."})
        }
    } catch (error) {
        logger.error(
            `CATCH ERROR : IN : frontGetSingleProduct :  : 🐞🐞🐞 : \n ${error}`
          );
    }
}

export{frontAllCategory,frontAllProduct ,frontGetSingleProduct}