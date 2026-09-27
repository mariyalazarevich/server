import express from "express"
import { checkToken, create, deleteByID, getAll, getUserByID, logIn, logOut, updateUserByID } from "../controller/userController.js"

export const route = express.Router()
route.post("/user", create)
route.get("/users",  checkToken, getAll)
route.get("/users/:id", checkToken, getUserByID)
route.put("/update/user/:id", checkToken, updateUserByID)
route.delete("/delete/user/:id", checkToken, deleteByID)
route.post("/login", logIn)
route.post("/logout", checkToken, logOut)