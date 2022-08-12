const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
    question: String,

    correct_answer: String,

    incorrect_answers: [String],

    answers: [String]
})

module.exports = QuizSchema