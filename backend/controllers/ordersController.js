import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Carrier, validateCarrier} from "../models/carrier.js";
import {User, validateUser} from "../models/user.js";
import {Admin, validateAdmin} from "../models/admin.js";
import {Product, validateProduct} from "../models/product.js";
import {Order, validateOrder} from "../models/order.js";
import {Country, validateCountry} from "../models/country.js";
import Joi from "joi";
const {compare} = pkg;

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
    const orders = await Order.find({userId: userId})
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
    const today = new Date();

    const orders = await Order.find({userId: userId})
      .populate({
        path: "productId",
        select: "country size duration createdDate status",
        match: {status: "active"},
        populate: {
          path: "countryId",
          select: "flag",
        },
      })
      .populate({
        path: "carrierId",
        select: "name logoUrl",
      })
      .lean();

    // Filter inactive products
    const filteredOrders = orders.filter((order) => order.productId);

    const customerOrders = filteredOrders.map((order) => {
      const {productId, carrierId} = order;
      const expirationDate = new Date(productId.createdDate);
      expirationDate.setDate(expirationDate.getDate() + productId.duration);

      // referenced from https://stackoverflow.com/a/15289883
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(
        productId.createdDate.getFullYear(),
        productId.createdDate.getMonth(),
        productId.createdDate.getDate()
      );
      const utc2 = Date.UTC(
        expirationDate.getFullYear(),
        expirationDate.getMonth(),
        expirationDate.getDate()
      );
      const remainingDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);

      return {
        ...order,
        _id: order._id.toString(),
        flag: productId.countryId.flag,
        country: productId.country,
        planSize: productId.size.toString(), // Format size in GB
        carrierLogo: carrierId.logoUrl,
        carrierName: carrierId.name,
        duration: productId.duration,
        createdDate: productId.createdDate,
        active: expirationDate >= today, // Determine active status
        usage: order.usage,
        remainingDays: remainingDays,
      };
    });

    res.status(200).send(customerOrders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

export const getMyPrevOrders = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");

  try {
    const today = new Date();

    const orders = await Order.find({userId: userId})
      .populate({
        path: "productId",
        select: "country size duration createdDate status",
        match: {status: "inactive"},
        populate: {
          path: "countryId",
          select: "flag",
        },
      })
      .populate({
        path: "carrierId",
        select: "name logoUrl",
      })
      .lean();

    // Filter inactive products
    const filteredOrders = orders.filter((order) => order.productId);

    const customerOrders = filteredOrders.map((order) => {
      const {productId, carrierId} = order;
      const expirationDate = new Date(productId.createdDate);
      expirationDate.setDate(expirationDate.getDate() + productId.duration);

      return {
        ...order,
        _id: order._id.toString(),
        flag: productId.countryId.flag,
        country: productId.country,
        planSize: productId.size.toString(), // Format size in GB
        carrierLogo: carrierId.logoUrl,
        carrierName: carrierId.name,
        duration: productId.duration,
        createdDate: productId.createdDate,
        active: expirationDate >= today, // Determine active status
      };
    });

    res.status(200).send(customerOrders);
  } catch (error) {
    res.status(500).send("An error occurred while fetching orders.");
  }
};

// getCarrierOrders (carrier)
export const getCarrierOrders = async (req, res) => {
  const carrierId = req.user._id;
  if (!carrierId) return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({carrierId: carrierId})
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
  const productId = req.params.productId; // Get the productId from the request parameters

  try {
    const orders = await Order.find({carrierId, productId})
      .populate({
        path: "userId",
        select: "firstName lastName", // Populate user details
      })
      .populate({
        path: "productId",
        select: "price", // Populate product details
      })
      .lean();

    const ordersToReturn = orders.map((order) => {
      return {
        ...order,
        userName: `${order.userId.firstName} ${order.userId.lastName}`,
        userId: order.userId._id,
        price: order.productId.price,
        productId: order.productId._id,
      };
    });
    res.send(ordersToReturn);
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

  const orderId = req.body.orderId;
  const delivered = req.body.delivered;

  if (typeof delivered !== "boolean")
    return res.status(400).send("Invalid delivered status.");

  try {
    // Find and update the order
    const order = await Order.findById(orderId);

    if (!order)
      return res
        .status(404)
        .send("Order not found or you do not have access to it.");

    if (order.carrierId.toString() !== carrierId)
      return res
        .status(403)
        .send("You do not have permission to update this order.");

    order.delivered = delivered; // Update the user's email
    await order.save(); // Save the updated user document

    res.send({
      message: `Order delivery status updated to ${delivered} successfully.`,
      order,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the order.");
  }
};
