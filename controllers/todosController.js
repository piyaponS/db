const Todo = require("./../models/todoModel");
const User = require("./../models/userModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
};

const postTodo = async (req, res) => {
  if (!req.body.content) {
    res.status(400).json({
      message: "Please add a text field.",
    });
  }

  const todo = await Todo.create({
    user: req.user.id,
    content: req.body.content,
  });
  res.status(200).json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  if (!req.user) {
    res.status(401).json({
      message: "User not found",
    });
  }
  //Ensure the logged in user matched to the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "User not found",
    });
  }

  if (todo) await Todo.deleteOne(todo);
  res.status(200).json({
    message: `${req.user.name} deletes data:${req.params.id}`,
  });
};

module.exports = { getTodos, postTodo, deleteTodo };
