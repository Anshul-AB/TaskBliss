const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const path = require("path");
const auth = require("./routes/auth");
const todoList = require("./routes/todoList");
const cors = require("cors");
const contact = require("./routes/contact");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const _dirname = path.resolve();

app.use("/api/v1", auth);
app.use("/api/v2", todoList);
app.use("/api/v3", contact);

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(_dirname, "/backend/frontend/build")));

app.get("*", (req, res) => {
  // Handle all other routes by sending the 'index.html' file
  res.sendFile(path.resolve(_dirname, "backend","frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
