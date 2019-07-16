const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.get("/questions", apiController.getQuestions);

router.post("/response", apiController.postResponse);

router.get("/result/:responseId", apiController.getResult);

module.exports = router;
