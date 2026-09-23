import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    data: {type: Date},
    time: {type: String}, //надо добавить в форму заказа поле со временем
    email: {type: String},
    name: {type: String},
    surname: {type: String},
    tel: {type: String},
    userID: {type: String}
})

export default mongoose.model("Orders", orderSchema)