const express = require("express");
const router = express.Router();
const upload = require("../uploadConfig");
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
} = require("../controllers/imageController");

// POST   /api/images        -> create (upload) a new image
router.post("/", upload.single("image"), createImage);

// GET    /api/images        -> get all images
router.get("/", getAllImages);

// GET    /api/images/:id    -> get one image
router.get("/:id", getImageById);

// PUT    /api/images/:id    -> update title/description/file
router.put("/:id", upload.single("image"), updateImage);

// DELETE /api/images/:id    -> delete an image
router.delete("/:id", deleteImage);

module.exports = router;

