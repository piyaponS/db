const express = require("express");
const router = express.Router();
const {
  getTodos,
  postTodo,
  deleteTodo,
} = require("./../controllers/todosController");
const { protectedRoute } = require("./../middleware/authMiddleware");

router.get("/", protectedRoute, getTodos);
router.post("/", protectedRoute, postTodo);
router.delete("/:id", protectedRoute, deleteTodo);

module.exports = router;
