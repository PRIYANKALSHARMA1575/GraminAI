const connect = require("./connect.js");
const express = require("express");
const cors = require("cors");
const users = require("./routes/userRoutes.js");
const app = express(); 
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("GraminAI backend is working ✅");
});
app.use(users);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connect.connectToServer();
    console.log("Connected to MongoDB");
});