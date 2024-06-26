const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/categoriesController.js");
const validator = require("../middlewares/validator.js");
const { paramID } = require("../validations/id.js");
const { bodyData } = require("../validations/categories.js");
const authenticateToken = require("../middlewares/auth.js");

router.use(authenticateToken);

router.post("/", validator(bodyData), store);

router.get("/", index);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put("/:id", validator(bodyData), update);

router.delete("/:id", destroy);

module.exports = router;
