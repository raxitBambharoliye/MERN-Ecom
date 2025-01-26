import mongoose, { Schema } from "mongoose";
import { MODAL } from "../constant";



const contactSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})




const ContactModal = mongoose.model(MODAL.CONTACT_MODAL, contactSchema);

export default ContactModal;