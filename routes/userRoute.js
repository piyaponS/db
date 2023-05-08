const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getData,
} = require("./../controllers/usersController");
const { protectedRoute } = require("./../middleware/authMiddleware");

router.post("/", loginUser);
router.post("/signup", registerUser);
router.get("/todos", protectedRoute, getData);

module.exports = router;
