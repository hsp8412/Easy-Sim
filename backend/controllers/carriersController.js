import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Carrier, validateCarrier} from "../models/carrier.js";
import Joi from "joi";
const {compare} = pkg;

// carriersController
// - GET getMe (carrier) // get token
// - POST carrierLogin (carrier)
// - POST carrierLogout (carrier)
// - POST updateMyProfile (carrier)
// - POST createNewCarrier (admin) // get role from middleware
// - POST updateCarrierById (admin)
// - DELETE deleteCarrierById (admin)

export const getMe = async (req, res) => {
    const carrierId = req.user._id;
    if (!carrierId) return res.status(401).send("Unauthorized");
    const carrier = await Carrier.findById(carrierId).select("-password");
    res.send(carrier);
  };
  
  export const login = async (req, res) => {
      const {error} = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
    
      let user = await Carrier.findOne({email: req.body.email});
      if (!user) return res.status(400).send("Invalid email or password.");
    
      const validPassword = await compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send("Invalid email or password.");
    
      const token = user.generateAuthToken();
      res
        .cookie("jwt_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 3600000,
        })
        .send({
          message: "Login successful",
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    };
    
    export const logout = (req, res) => {
      res
        .clearCookie("jwt_token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send("Logged out");
    };
    
    function validate(req) {
      const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
      };
    
      return Joi.object(schema).validate(req.body);
    }
    