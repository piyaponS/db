const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const protectedRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(req.user);

      req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      mesage: "Not authorized, no token",
    });
  }
};

module.exports = { protectedRoute };
