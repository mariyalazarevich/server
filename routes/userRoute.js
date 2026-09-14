import express from "express"
import { create } from "../controller/userController.js"

export const route = express.Router()

route.post("/user", create)


