import express from "express";
import {create} from "../controller/orderController.js"

export const route = express.Router()
route.post("/order", create)