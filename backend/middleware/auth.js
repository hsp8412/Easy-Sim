import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(req);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    req.isAdmin = decoded.role === "admin";
    req.isCarrier = decoded.role === "carrier";
    req.isUser = decoded.role === "user";

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
