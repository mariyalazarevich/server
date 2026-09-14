import Orders from "../model/orderModel.js";

export const create = async (req, res) => {
    try {   
        const newOrder = new Orders(req.body)

        const {date, time} = newOrder

        const existOrder = await Orders.findOne({ date, time })

        if (existOrder){
            return res.status(400).json({message: "Order with this datetime already exist"});
        }

        res.status(200).json(await newOrder.save());

    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}