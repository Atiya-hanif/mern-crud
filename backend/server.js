require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

// ---------- Middleware ----------
app.use(cors()); // allow requests from our React frontend
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
// e.g. http://localhost:5000/uploads/1699999999-cat.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- Routes ----------
app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("Image CRUD API is running. Try GET /api/images");
});
 app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(500).json({
    message: error.message || "Internal server error",
  });
});  

// ---------- Connect to MongoDB and start server ----------
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/image_crud_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

