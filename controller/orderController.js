import Orders from "../model/orderModel.js";

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
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getOrdersByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const ordersWithDate = await Orders.find(date)
        if (!ordersWithDate || ordersWithDate.length === 0) {
            return res.status(404).json({message: "There are no Orders with your request"})
        }
        res.status(200).json(ordersWithDate);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getOrdersByUserID = async (req, res) => {
    try {
        const userID = req.params.userID;
        const ordersWithUserID = await Orders.find(userID)
        if (!ordersWithUserID || ordersWithUserID.length === 0) {
            return res.status(404).json({message: "There are no Orders with your request"})
        }
        res.status(200).json(ordersWithUserID);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}