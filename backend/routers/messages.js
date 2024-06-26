const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  destroy,
} = require("../controllers/messagesController.js");
const validator = require("../middlewares/validator.js");
const { paramID } = require("../validations/id.js");
const { bodyData } = require("../validations/messages.js");
const authenticateToken = require("../middlewares/auth.js");

router.use(authenticateToken);

router.get("/", index);

router.post("/", validator(bodyData), store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.delete("/:id", destroy);

module.exports = router;
