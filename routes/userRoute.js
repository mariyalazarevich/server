import express from "express"
import { create, deleteByID, getAll, getUserByID, updateUserByID } from "../controller/userController.js"

export const route = express.Router()
route.post("/user", create)
route.get("/users", getAll)
route.get("/users/:id", getUserByID)
route.put("/update/user/:id", updateUserByID)
route.delete("/delete/user/:id", deleteByID)
