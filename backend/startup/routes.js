import usersRoutes from "../routes/users.js";
import authRoutes from "../routes/auth.js";
import adminRoutes from "../routes/admin.js";
import carrierRoutes from "../routes/carrier.js";
import productRoutes from "../routes/product.js";
import countryRoutes from "../routes/country.js";
import orderRoutes from "../routes/order.js";
import proposalRoutes from "../routes/proposal.js";
import refundRoutes from "../routes/refund.js";
import messageRoutes from "../routes/message.js";

const setupRoutes = (app) => {
  // redirect to usersRoutes => ../routes/users.js
  // http://localhost3000/api/users/me
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/carrier", carrierRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/country", countryRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/proposal", proposalRoutes);
  app.use("/api/refund", refundRoutes);
  app.use("/api/message", messageRoutes);
};

export default setupRoutes;
