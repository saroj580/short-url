const express = require("express");
const { handleGenerateShortUrl,
        handleGetShortId,
 } = require("../controller/routeProgram");
const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleGetShortId);

module.exports = router;

