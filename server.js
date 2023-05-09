const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const todos = require("./routes/todosRoute");
const users = require("./routes/userRoute");
const cors = require("cors");
const corsOptions = {
  origin: "https://my-todos-two.vercel.app/",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/todos", todos);
app.use("/api/users", users);
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@database.khjlk4g.mongodb.net/data?retryWrites=true&w=majority`
  )
  .then((conn) => {
    if (conn.connection.readyState === 1) {
      console.log("Connected successfully");
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
