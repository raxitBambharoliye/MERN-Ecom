import mongoose from "mongoose";
import { MODAL } from "../constant";


const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        require:true,
    },
    categoryImage:{
        type:String,
        require:true,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:MODAL.ADMIN_MODAL,
        require:true,
    },
    isActive: {
        type: Boolean,
    require: true,
    }
},{timestamps:true})

const CategoryModal = mongoose.model(MODAL.CATEGORY_MODAL,categorySchema);


export default CategoryModal;