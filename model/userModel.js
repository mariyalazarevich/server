import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    login: {type: String},
    password: {type: String},
    name: {type: String},
    surname: {type: String},
    email: {type: String},
})

export default mongoose.model("Users", userSchema)