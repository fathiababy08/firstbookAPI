const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mesaage: "Auth failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      req.user = { username: payload.userName };
      next();
    }
  } catch (error) {
    return res.status(401).json({ mesaage: "Auth failed" });
  }
};

module.exports = auth;
