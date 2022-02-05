const express = require("express");
const router = express.Router();

const {
  authenticate,
  create,
  update,
  fetch,
  destroy,
  destroyMultiple,
} = require("../controller/userController");

router.post("/login", authenticate);
router.route("/").post(create).put(update).get(fetch).delete(destroyMultiple);
router.delete("/:id", destroy);

module.exports = router;
