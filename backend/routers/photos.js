const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/photosController.js");
const validator = require("../middlewares/validator.js");
const authenticateToken = require("../middlewares/auth.js");
const { paramID } = require("../validations/id.js");
const { bodyData } = require("../validations/photos.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/image",
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.get("/", index);

router.use(authenticateToken);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.post("/", [upload.single("image"), validator(bodyData)], store);

router.put("/:id", [upload.single("image"), validator(bodyData)], update);

router.delete("/:id", destroy);

module.exports = router;
