const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/userProfile")
const QuestionControler = require("../controllers/question_controller")

router.get("/:id", UserProfileController.userProfileSearch)

router.get("/question/:subject", QuestionControler.questionSelector)

router.post("/:id", UserProfileController.updateUserProfile)

router.post("/question/evaluate/:subject", QuestionControler.evaluate)

module.exports = router