import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    dateTime: {type: Date},
    email: {type: String},
    name: {type: String},
    surname: {type: String},
    tel: {type: String},
    userID: {type: String},
    status: {type: String},
})

export default mongoose.model("Orders", orderSchema)