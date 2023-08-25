import Order from "../models/order.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate("products", "-images")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (err) {
        console.log(err);
    }
};

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("products", "-images")
            .populate("buyer", "firstName")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (err) {
        console.log(err);
    }
};
