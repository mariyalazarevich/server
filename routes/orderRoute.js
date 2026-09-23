import express from "express";
import {create, getAll, getOrdersByDate, getOrdersByUserID} from "../controller/orderController.js"

export const route = express.Router()
route.post("/order", create)
route.get("/orders", getAll)
route.get("/orders/:date", getOrdersByDate)
route.get("/orders/:userID", getOrdersByUserID)