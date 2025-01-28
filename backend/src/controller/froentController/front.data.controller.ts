import { MQ } from "../../common";
import { MODAL } from "../../constant";
import ProductIn from "../../interface/Product.intereface";
import ReviewIn from "../../interface/Review.interface";
import logger from "../../utility/log";

const frontAllCategory = async (req: any, res: any) => {
  try {
    let data = await MQ.find(MODAL.CATEGORY_MODAL, { isActive: true });
    if (data) {
      res.status(200).json({ allCategory: data });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : category : frontAllCategory : 🐞🐞🐞 : \n ${error}`);
  }
};
const frontAllProduct = async (req: any, res: any) => {
  try {
    let query: any = { isActive: true };
    if (req.query.singleId) {
      query._id = req.query.singleId;
    }

    let data = await MQ.find(MODAL.PRODUCT_MODAL, query);
    if (data) {
      res.status(200).json({ allProducts: data });
    } else {
      res.status(400).json({ message: "some thing went wrong, please try again later." });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : frontAllProduct :  : 🐞🐞🐞 : \n ${error}`);
  }
};

const frontGetSingleProduct = async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "product not found" });
    }
    let productData = await MQ.findById<ProductIn>(MODAL.PRODUCT_MODAL, req.params.id);
    let reviewData = await MQ.findWithPopulate<ReviewIn[] | []>(MODAL.PRODUCT_REVIEW_MODAL, { productId: req.params.id }, "userId", "userName profile");

    let reviewSummary: any = {
      averageRating: 0,
      rating: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      },
    };
    if (reviewData && reviewData.length > 0) {
      let totalRating = 0;
      reviewData?.forEach((review: any) => {
        totalRating += review.rating;
        reviewSummary.rating[review.rating] += 1;
      });
      reviewSummary.averageRating = totalRating / reviewData.length;
      console.log("reviewData.length", reviewData.length);
      for (const key in reviewSummary.rating) {
        reviewSummary.rating[key] = reviewSummary.rating[key] != 0 ? ((reviewSummary.rating[key] / reviewData.length) * 100).toFixed(2) : 0;
      }
    }

    console.log("reviewData", reviewSummary);

    if (productData && productData.isActive) {
      res.status(200).json({ productData, reviewData, reviewSummary });
    } else {
      res.status(400).json({ message: "some thing went wrong, please try again later." });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : frontGetSingleProduct :  : 🐞🐞🐞 : \n ${error}`);
  }
};

export { frontAllCategory, frontAllProduct, frontGetSingleProduct };
