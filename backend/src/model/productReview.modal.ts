import mongoose, { Schema } from "mongoose";
import { MODAL } from "../constant";
import ReviewIn from "../interface/Review.interface";

const productSchema = new Schema<ReviewIn>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODAL.USER_MODAL,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: MODAL.PRODUCT_MODAL,
        required: true,
    },
    reviewMessage: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{timestamps:true});

const Product_Review_modal = mongoose.model<ReviewIn>(MODAL.PRODUCT_REVIEW_MODAL, productSchema);
export default Product_Review_modal;