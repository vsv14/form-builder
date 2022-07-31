import mongoose from "mongoose";



const FormAwnser = new mongoose.Schema({
    user_uuid: {
        type: String,
        required: true
    },

    form_uuid: {
        type: String,
        required: true
    },

    valueItems: {
        type: [String],
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});

const FormAwnserModel = mongoose.model('formAwnser', FormAwnser);

export default FormAwnserModel;