const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/moneytracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api", transactionRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});



app.get("/", (req, res) => {
  res.send("API Running");
});

