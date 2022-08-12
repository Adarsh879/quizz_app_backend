const mongoose = require("mongoose")
var url = "mongodb://localhost:27017/quiz";
const QuizSchema = require("../schemas/quiz")
const UserProfile = require("../schemas/user_profile")

exports.questionSelector = async (req,res,next) =>{
    var subjectString = req.params.subject
    const subject = subjectString.replace(":","")
    const quizModel = mongoose.model('quizDocument',QuizSchema,`${subject}Mcq`)
    try{
    await mongoose.connect(url)
    let questions = await quizModel.find({},{correct_answer: 0,incorrect_answers: 0}).sort({ _id: -1 }).limit(10)
    
    console.log(questions)
    for(const question of questions){
      let answers = await quizModel.findById(question._id,{question:0})
      console.log(answers)
      question.answers = answers.incorrect_answers
      question.answers.push(answers.correct_answer)
    }
    mongoose.disconnect()
    res.json(questions)
    } catch (err){
      console.log("error")
      res.status(500).json({
        error: err.message
      })
    }
  }

exports.evaluate = async (req,res,next) =>{
  var subjectString = req.params.subject
  const subject = subjectString.replace(":","")
  console.log(req.body.selecter_answer)
  const id = req.body.uid
  var score = 0
  try{
    await mongoose.connect(url)
    const quizModel = mongoose.model('quizDocument',QuizSchema,`${subject}Mcq`)
    chosen_answer = req.body
    let answers = await quizModel.find({},{correct_answer: 1}).sort({ _id: -1 }).limit(10)
    console.log(chosen_answer)
    var userKey = `${subject}Score`
    answers.forEach((element,index) => {
      answerNum = `answer${index+1}`
      if(chosen_answer[answerNum] == element.correct_answer){
        score +=1
        console.log("yes")
      }
    })
    var user = await UserProfile.findByIdAndUpdate(id,
      )
    user[userKey] += score
    await user.save()
    res.json({
      "status": "success"
    })  
  }catch (err){
    res.status(500).json({
      error: err.message
    })
  }
}



