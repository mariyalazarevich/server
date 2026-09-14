import mongoose from "mongoose";

const orderShema = mongoose.Schema({
    data: {type: Date},
    time: {type: String},
    email: {type: String},
    name: {type: String},
    surname: {type: String},
    tel: {type: String},
})

export default mongoose.model("Orders", orderShema)