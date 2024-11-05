import usersRoutes from "../routes/users.js";
import authRoutes from "../routes/auth.js";

const setupRoutes = (app) => {
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
};

export default setupRoutes;
