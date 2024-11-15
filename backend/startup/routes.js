import usersRoutes from "../routes/users.js";
import authRoutes from "../routes/auth.js";
import adminRoutes from "../routes/admin.js";
import carrierRoutes from "../routes/carrier.js";
import productRoutes from "../routes/product.js";
const setupRoutes = (app) => {
  // redirect to usersRoutes => ../routes/users.js
  // http://localhost3000/api/users/me 
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/carrier", carrierRoutes);
  app.use("/api/product", productRoutes)
};

export default setupRoutes;
