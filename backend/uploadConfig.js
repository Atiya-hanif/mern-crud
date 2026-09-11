
const multer = require("multer");
const path = require("path");

// Remove this diskStorage Complete code
// const storage = multer.diskStorage({
// Code
// });

// Add below code instead
const storage = multer.memoryStorage(); //Only this line get Changed

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const isAllowed = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png, gif, webp) are allowed!"));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;

