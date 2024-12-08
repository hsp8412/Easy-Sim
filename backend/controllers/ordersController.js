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
import Stripe from "stripe";

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
  const role = req.user.role;
  if (!userId || role != "user") return res.status(401).send("Unauthorized");

  try {
    const orders = await Order.find({userId: userId})
      .populate({
        path: "productId",
        select: "country size duration speed",
        populate: {
          path: "countryId",
          select: "flag name",
        },
      })
      .populate({
        path: "carrierId",
        select: "name logoUrl",
      })
      .lean();

    const customerOrders = orders.map((order) => {
      const expirationDate = new Date(order.createdDate);
      expirationDate.setDate(
        expirationDate.getDate() + order.productId.duration
      );
      const today = new Date();

      return {
        ...order,
        flag: order.productId.countryId.flag,
        country: order.productId.countryId.name,
        planSize: order.productId.size,
        duration: order.productId.duration,
        speed: order.productId.speed,
        carrierLogo: order.carrierId.logoUrl,
        carrierName: order.carrierId.name,
        active: expirationDate >= today, // Determine active status
        remainingDays: Math.max(
          Math.floor(
            (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          ),
          0
        ),
      };
    });
    console.log(customerOrders);

    res.status(200).send(customerOrders);
  } catch (error) {
    console.log(error);
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

    let ordersToReturn = orders.map((order) => {
      console.log(order);
      if (!order.userId) return null;
      return {
        ...order,
        userName: `${order.userId.firstName} ${order.userId.lastName}`,
        userId: order.userId._id,
        price: order.productId.price,
        productId: order.productId._id,
      };
    });

    //filter out undefined values
    ordersToReturn = ordersToReturn.filter((order) => order);
    res.send(ordersToReturn);
    console.log(ordersToReturn);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching orders.");
  }
};

// - POST createNewOrder (user)
export const createNewOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const userId = req.user._id; // Assuming the user's ID is in `req.user._id`
  if (!userId && req.user.role != "user")
    return res.status(401).send("Unauthorized");

  try {
    const productId = req.body.productId;

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found.");

    // Create a new order
    const newOrder = new Order({
      carrierId: product.carrierId,
      userId,
      productId,
      paymentStatus: "Pending",
      delivered: false,
      usage: 0,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.country} ${product.size}GB ${product.duration} Days Data Plan`,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        app_id: "easy-sim",
        order_id: newOrder._id.toString(),
      },
    });

    newOrder.sessionId = session.id;

    await newOrder.save();

    res.status(201).send({
      message: "Order created successfully.",
      order: newOrder,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the order.");
  }
};

export const createPaymentSession = async (req, res) => {
  const {orderId} = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send("Order not found.");

    if (order.paymentStatus.toLowerCase() === "completed")
      return res.status(400).send("Payment already completed.");

    const product = await Product.findById(order.productId);
    if (!product) return res.status(404).send("Product not found.");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.country} ${product.size}GB ${product.duration} Days Data Plan`,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        app_id: "easy-sim",
        order_id: order._id.toString(),
      },
    });

    // Update the order with the new sessionId
    order.sessionId = session.id;
    await order.save();

    res.status(200).send({sessionId: session.id});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occurred while creating the payment session.");
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

export const updateOrderPaymentStatus = async (req, res) => {
  // const sig = req.headers["stripe-signature"];

  let event = req.body;

  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig);
  // } catch (err) {
  //   console.error(`Webhook signature verification failed: ${err.message}`);
  //   return res.status(400).send(`Webhook Error: ${err.message}`);
  // }

  // Handle the event
  try {
    if (
      event.type === "checkout.session.completed" &&
      event.data.object.metadata.app_id === "easy-sim"
    ) {
      const session = event.data.object;
      const orderId = session.metadata.order_id;

      const order = await Order.findById(orderId);
      if (!order) return res.status(404).send(`Order ${orderId} not found`);

      order.paymentStatus = "Completed";
      await order.save();
    }
    res.json({received: true});
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(500).send("An error occurred while updating the order.");
  }
};
