const express = require("express");
const app = express();
require('dotenv').config();
require('./connection/connection')
const auth = require('./routes/auth');
const todoList = require('./routes/todoList');
const cors = require('cors');
const contact = require("./routes/contact");
const path = require('path');

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

app.use("/api/v1", auth);
app.use("/api/v2", todoList);
app.use("/api/v3", contact)

app.get('/', function(req, res){
    // Serve static files from the 'frontend/build' directory
    app.use(express.static(path.resolve(__dirname, 'frontend','build')));
    // Handle all other routes by sending the 'index.html' file
    res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`)
})