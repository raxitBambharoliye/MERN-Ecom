import mongoose, { Schema } from "mongoose";
import { MODAL } from "../constant";
import AddressIN from "../interface/Address.interface";

const addressSchema = new Schema<AddressIN>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: MODAL.USER_MODAL,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    mapLink: {
        type: String,
        required: false,
    },
},{timestamps:true});

const Address_Modal = mongoose.model<AddressIN>(MODAL.ADDRESS_MODAL, addressSchema);
export default Address_Modal;
