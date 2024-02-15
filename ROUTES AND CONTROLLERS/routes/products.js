const express = require("express");
const router = express.Router();
const { getallproducts, getallproducttesting } = require("../controllers/products")

router.route("/").get(getallproducts);
router.route("/testing").get(getallproducttesting);

module.exports = router;