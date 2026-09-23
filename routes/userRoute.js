import express from "express"
import { create, getAll, getUserByID } from "../controller/userController.js"

export const route = express.Router()

route.post("/user", create)
route.get("/users", getAll)
route.get("/users/:userID", getUserByID)
