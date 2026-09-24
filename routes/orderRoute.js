import express from "express";
import {create, deleteByID, getAll, getOrderByID, getOrdersByDate, getOrdersByUserID, updateOrderByID} from "../controller/orderController.js"

export const route = express.Router()
route.post("/order", create)
route.get("/orders", getAll)
route.get("/orders/:date", getOrdersByDate)
route.get("/orders/:userID", getOrdersByUserID)
route.get("/orders/:id", getOrderByID)
route.put("/update/order/:id", updateOrderByID)
route.delete("/delete/order/:id", deleteByID)