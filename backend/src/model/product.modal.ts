import mongoose, { Schema } from "mongoose";
import { MODAL } from "../constant";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODAL.CATEGORY_MODAL,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    mulImage: {
        type: Array,
        required: true
    }
});

const ProductModal = mongoose.model(MODAL.PRODUCT_MODAL, productSchema);
export default ProductModal;