import mongoose from "mongoose";
import { MODAL } from "../constant";


const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    profile: {
        type: String,
    }
}, { timestamps: true })



const AdminModal = mongoose.model(MODAL.ADMIN_MODAL, adminSchema);

export default AdminModal;