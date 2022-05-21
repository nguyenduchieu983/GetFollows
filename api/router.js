const express = require("express");
const router = express.Router();
const services = require("./services")

router.get("/getFollowsCount/instagram", services.runInstagram);
router.get("/getFollowsCount/youtube", services.runYoutube);
router.get("/getFollowsCount/twitter", services.runTwitter);
router.get("/getFollowsCount/tiktok", services.runTiktok);

module.exports = router;