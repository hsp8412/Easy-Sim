import pkg from "bcryptjs";
const { hash, genSalt } = pkg;

import _ from "lodash";
import { Carrier, validateCarrier } from "../models/carrier.js";
import { User, validateUser } from "../models/user.js";
import { Admin, validateAdmin } from "../models/admin.js";
import { Product, validateProduct } from "../models/product.js";
import { Order, validateOrder } from "../models/order.js";
import { Country, validateCountry } from "../models/country.js";
import Joi from "joi";
const { compare } = pkg;

// ordersController
// - GET getMyOrders (user)
// -GET getCarrierOrders (carrier)
// - GET getOrdersByProductId (carrier) (return orders)
// - POST createNewOrder (user) (get productId from req.body)
// - POST updateDelivered (carrier)

// for user profile
// - GET getMyCurrentOrder
// - GET getMyPrevOrders

// getMyOrders (user)
export const getMyOrders = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({ userId: userId })
      .populate({
        path: "userId",
        select: "firstName lastName", // Select only firstName and lastName from the user table
      })
      .populate({
        path: "productId",
        select: "price productId", // Select only price and productId from the product table
      });

    res.send(orders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

export const getMyCurrentOrder = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({ userId: userId })
      .populate("carrierId", "logoUrl")
      .select("carrierId");

    res.send(orders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

export const getMyPrevOrder = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");

  res.send(orders);
  try {
    const orders = await Order.find({ userId: userId });
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

// getCarrierOrders (carrier)
export const getCarrierOrders = async (req, res) => {
  const carrierId = req.user._id;
  if (!carrierId) return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({ carrierId: carrierId })
      .populate({
        path: "carrierId",
        select: "name", // Select only firstName and lastName from the user table
      })
      .populate({
        path: "productId",
        select: "price productId", // Select only price and productId from the product table
      });

    res.send(orders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

// - GET getOrdersByProductId (carrier)
export const getOrdersByProductId = async (req, res) => {
  const carrierId = req.user._id; // Assuming the carrier's ID is in `req.user._id`
  const productId = req.body.productId; // Get the productId from the request parameters

  if (!carrierId) return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({ carrierId, productId })
      .populate({
        path: "userId",
        select: "firstName lastName email", // Populate user details
      })
      .populate({
        path: "productId",
        select: "name price", // Populate product details
      });

    if (!orders.length)
      return res.status(404).send("No orders found for the specified product.");

    res.send(orders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

// - POST createNewOrder (user)
export const createNewOrder = async (req, res) => {
  const userId = req.user._id; // Assuming the user's ID is in `req.user._id`

  if (!userId) return res.status(401).send("Unauthorized");

  try {
    const productId = req.body.productId;

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found.");

    // Create a new order
    const newOrder = new Order({
      carrierId: product.carrierId, // Get the carrierId from the product
      userId,
      productId,
      paymentStatus: "Pending", // Default payment status
      delivered: false, // Default delivery status
      usage: 0, // Default usage
    });

    await newOrder.save();

    res.status(201).send({
      message: "Order created successfully.",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).send("An error occurred while creating the order.");
  }
};

// - POST updateDelivered (carrier)
export const updateDelivered = async (req, res) => {
  const carrierId = req.user._id; // Assuming the carrier's ID is in `req.user._id`

  if (!carrierId) return res.status(401).send("Unauthorized");

  const orderId = req.body.orderId;
  const delivered = req.body.delivered;

  try {
    // Validate the input
    if (typeof delivered !== "boolean")
      return res.status(400).send("Invalid delivered status.");

    // Find and update the order
    const order = await Order.findById(orderId);

    if (!order)
      return res
        .status(404)
        .send("Order not found or you do not have access to it.");

    order.delivered = delivered; // Update the user's email
    await order.save(); // Save the updated user document

    res.send({
      message: "Order delivery status updated successfully.",
      order,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the order.");
  }
};
