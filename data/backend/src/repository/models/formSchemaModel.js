import mongoose from "mongoose";



const FormSchema = new mongoose.Schema({
    form_uuid: {
        type: String,
        required: true
    },

    formSchema: {
        type: String,
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});

const FormSchemaModel = mongoose.model('formSchema', FormSchema);

export default FormSchemaModel;