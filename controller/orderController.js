import Orders from "../model/orderModel.js";
import { checkAdmin, checkUser } from "./userController.js";

export const create = async (req, res) => {
    try {   
        const newOrder = new Orders(req.body)
        const {date, time} = newOrder
        const existOrder = await Orders.findOne({ date, time })
        if (existOrder){
            return res.status(400).json({message: "Order with this datetime already exist"});
        }
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAll = async (req, res) => {
    try {
        const allOrders = await Orders.find();
        if(!allOrders || allOrders.length === 0) {
            return res.status(404).json({message: "There are no Orders with your request"})
        }
        const isAdmin = await checkAdmin(req, res)
        if (!isAdmin){
            return res.status(403).json({message: "Forbidden"})
        }
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getOrdersByDate = async (req, res) => {
    try {
        const date = req.params.date;
        console.log(date)
        const ordersWithDate = await Orders.find({date})
        if (!ordersWithDate || ordersWithDate.length === 0) {
            return res.status(404).json({message: "There are no Orders with your request"})
        }
        const isAdmin = await checkAdmin(req, res)
        if (!isAdmin){
            return res.status(403).json({message: "Forbidden"})
        }
        res.status(200).json(ordersWithDate);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getOrdersByUserID = async (req, res) => {
    try {
        const userID = req.params.userID;
        const ordersWithUserID = await Orders.find({ userID: userID });
        if (!ordersWithUserID || ordersWithUserID.length === 0) {
            return res.status(404).json({message: "There are no Orders with your request"})
        }
        const isAdmin = await checkAdmin(req, res)
        const isVAlidUser = await checkUser(req, res, userID)
        if (!isAdmin && !isVAlidUser){
            return res.status(403).json({message: "Forbidden"})
        }
        res.status(200).json(ordersWithUserID);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getOrderByID = async (req, res) => {
    try {
        const id = req.params.id;
        const orderWithID = await Orders.findOne({_id: id})
        if (!orderWithID || orderWithID.length === 0) {
            return res.status(404).json({message: "There are no Order with your request"})
        }
        const isValidUser = orderWithID.userID === req.user._id
        const isAdmin = await checkAdmin(req, res)
        if (!isAdmin && !isValidUser){
            return res.status(403).json({message: "Forbidden"})
        }
        res.status(200).json(orderWithID);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const updateOrderByID = async (req, res) => {
    try {
        const id = req.params.id;
        const orderWithID = await Orders.findOne({_id: id});;
        if (!orderWithID){
            return res.status(404).json({message: "There are no Order with this ID"})
        }
        const isValidUser = orderWithID.userID === req.user._id
        const isAdmin = await checkAdmin(req, res)
        if (!isAdmin && !isValidUser){
            return res.status(403).json({message: "Forbidden"})
        }
        await Orders.findByIdAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).json({message: "Order updated succesfully"})
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const deleteByID = async (req, res) => {
    try {
        const id = req.params.id;
        const orderWithID = await Orders.findOne({_id: id});;
        if (!orderWithID){
            return res.status(404).json({message: "There are no Order with this ID"})
        }
        const isValidUser = orderWithID.userID === req.user._id
        const isAdmin = await checkAdmin(req, res)
        if (!isAdmin && !isValidUser){
            return res.status(403).json({message: "Forbidden"})
        }
        await Orders.findByIdAndDelete({_id: id});
        res.status(200).json({message: "Order deleted succesfully"})
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}