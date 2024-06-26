const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController.js");
const validator = require("../middlewares/validator.js");
const { registerBody, loginBody } = require("../validations/users.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/image_profile",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});
const upload = multer({ storage });

router.post(
  "/register",
  [upload.single("image_profile"), validator(registerBody)],
  register
);

router.post("/login", validator(loginBody), login);

module.exports = router;
