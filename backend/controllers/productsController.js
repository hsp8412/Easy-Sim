import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Carrier, validateCarrier} from "../models/carrier.js";
import {User, validateUser} from "../models/user.js";
import {Admin, validateAdmin} from "../models/admin.js";
import {Product, validateProduct} from "../models/product.js";
import {Order, validateOrder} from "../models/order.js";
import Joi from "joi";
const {compare} = pkg;


// productsController
// - GET getAllProducts (everyone)
// - GET getMyProducts (carrier)
// - GET getProductsByCountryId (everyone)
// - GET getProductsByCarrierId (admin)
// - POST deactivateProductByProductId (admin)
// - creation of new produt will be integrated to proposal review

// getAllProducts (everyone)
export const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  };

// - GET getProductsByCountryId (everyone)
export const getProductsByCountryId = async (req, res) => {
    try {
      const countryId = req.body.countryId; 
      const products = await Product.find({ countryId: countryId });
      res.send(products);
    } catch (error) {
      res.status(500).send("An error occurred while retrieving your products.");
    }
  };

// - GET getMyProducts (carrier)
export const getMyProducts = async (req, res) => {
    try {
      const carrierId = req.user._id; 
      const products = await Product.find({ carrier_id: carrierId });
      res.send(products);
    } catch (error) {
      res.status(500).send("An error occurred while retrieving your products.");
    }
  };

// - GET getProductsByCarrierId (admin)
export const getProductsByCarrierId = async (req, res) => {
    try {
      const carrierId = req.body.id; 
      const products = await Product.find({ carrier_id: carrierId });
      res.send(products);
    } catch (error) {
      res.status(500).send("An error occurred while retrieving your products.");
    }
  };

// - POST deactivateProductByProductId (admin)
// POST deactivateProductByProductId (admin)
export const updateProductStatusByProductId = async (req, res) => {
    try {
      const productId = req.body.Id; // Product ID is passed in the URL as a parameter
      const product = await Product.findById(productId);
  
      if (!product) return res.status(404).send("Product not found.");
      if (product.status === "active") {
        product.status = "inactive";
      } else if (product.status === "inactive") {
        product.status = "active";
      }
  
      await product.save();
  
      res.send({
        message: "Product status updated successfully.",
        product,
      });
    } catch (error) {
      res.status(500).send("An error occurred while deactivating the product.");
    }
  };