import jwt from "jsonwebtoken";

export const admin_auth = (req, res, next) => {
  const token = req.cookies.jwt_token; 
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (decoded.role !== "admin") {
      return res.status(401).send("Access denied");
    };
    req.admin = decoded;
    req.isAdmin = decoded.role === "admin";
    req.isCarrier = decoded.role === "carrier";
    req.isUser = decoded.role === "user";

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
