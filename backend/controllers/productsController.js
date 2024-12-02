import _ from "lodash";
import {Product} from "../models/product.js";

// productsController
// - GET getAllProducts (everyone)
// - GET getMyProducts (carrier)
// - GET getProductsByCountryId (everyone)
// - GET getProductsByCarrierId (admin)
// - POST deactivateProductByProductId (admin)
// - creation of new produt will be integrated to proposal review

// getAllProducts (everyone)
export const getAllProducts = async (req, res) => {
  try {
    // Fetch products and populate the countryId field with data from the Country collection
    const products = await Product.find({}).populate({
      path: "countryId",
      select: "name",
    });

    res.send(products);

    // sample res:
    //   {
    //     "_id": "63a1f7f6f75e63d5b97d7b01",
    //     "name": "Sample Product",
    //     "countryId": {
    //       "_id": "63a1f7f6f75e63d5b97d7b00",
    //       "name": "USA"
    //     }
    //   }
    // to get country name: product.countryId.name
  } catch (error) {
    res.status(500).send("An error occurred while fetching products.");
  }
};

// - GET getProductsByCountryId (everyone)
export const getProductsByCountryId = async (req, res) => {
  try {
    const countryId = req.params.countryId;

    const products = await Product.find({
      countryId: countryId,
    })
      .populate({path: "carrierId", select: "-password"})
      .lean();

    const flattendProducts = products.map((product) => ({
      ...product,
      carrierId: product.carrierId._id,
      carrierName: product.carrierId.name,
      carrierEmail: product.carrierId.email,
      carrierLogo: product.carrierId.logoUrl,
    }));

    res.send(flattendProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving your products.");
  }
};

// - GET getMyProducts (carrier)
export const getMyProducts = async (req, res) => {
  try {
    const carrierId = req.user._id;
    const products = await Product.find({carrierId: carrierId});
    res.send(products);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving your products.");
  }
};

export const updateMyProductStatus = async (req, res) => {
  try {
    const {productId, status} = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).send("Product not found.");
    console.log(product.carrierId, req.user._id);
    if (product.carrierId.toString() !== req.user._id)
      return res
        .status(403)
        .send("You are not authorized to update this product.");

    product.status = status;

    await product.save();

    res.send({
      message: `Product status updated to ${status} successfully.`,
      product,
    });
  } catch (error) {
    res.status(500).send("An error occurred while deactivating the product.");
  }
};

// - GET getProductsByCarrierId (admin)
export const getProductsByCarrierId = async (req, res) => {
  try {
    const carrierId = req.body.id;
    const products = await Product.find({carrierId: carrierId});
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
      message: `Product status updated to ${product.status} successfully.`,
      product,
    });
  } catch (error) {
    res.status(500).send("An error occurred while deactivating the product.");
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).send(`Product with id ${productId} not found.`);
    res.send(product);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving your products.");
  }
};
