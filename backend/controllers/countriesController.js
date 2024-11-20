// countriesController
// - GET getAllCountries (everyone)
// - GET getCountryById (everyone) 

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

// - GET getAllCountries (everyone)
export const getAllCountries = async (req, res) => {
    try {
      // Fetch products and populate the countryId field with data from the Country collection
      const countries = await Country.find({});   
      res.send(countries);
    } catch (error) {
      res.status(500).send("An error occurred while fetching products.");
    }
  };

// - GET getCountriesById (everyone) 
export const getCountriesById = async (req, res) => {
    try {
      const countryId = req.body.countryId; 
      const countries = await Country.findById(countryId);
      res.send(countries);
    } catch (error) {
      res.status(500).send("An error occurred while retrieving your products.");
    }
  };