import express from "express";
import {create, deleteByID, getAll, getOrderByID, getOrdersByDate, getOrdersByUserID, updateOrderByID} from "../controller/orderController.js"
import { checkToken } from "../controller/userController.js";

export const route = express.Router()
route.post("/order", checkToken, create)
route.get("/orders", checkToken, getAll)
route.get("/orders/date/:date", checkToken, getOrdersByDate)
route.get("/orders/userID/:userID", checkToken, getOrdersByUserID)
route.get("/order/:id", checkToken, getOrderByID)
route.put("/update/order/:id", checkToken, updateOrderByID)
route.delete("/delete/order/:id", checkToken, deleteByID)