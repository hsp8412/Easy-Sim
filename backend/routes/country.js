import {
    getAllCountries,
    getCountriesById,
    } from "../controllers/countriesController.js";
  import {carrier_auth} from "../middleware/carrier_auth.js";
  import {admin_auth} from "../middleware/admin_auth.js";
  import express from "express";
  
  const router = express.Router();
  
  
  // everyone routes
  router.get("/get-all-countries", getAllCountries);
  router.get("/get-countries-by-id", getCountriesById);
  
  
  export default router;
  