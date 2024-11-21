import {
  getAllCountries,
  getCountriesById,
} from "../controllers/countriesController.js";
import express from "express";

const router = express.Router();

// everyone routes
router.get("/get-all-countries", getAllCountries);
router.get("/get-countries-by-id/:countryId", getCountriesById);

export default router;
