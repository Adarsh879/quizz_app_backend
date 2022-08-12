const mongoose = require("mongoose")
const methods = require("../helpers/profile")
const startProfile = methods.startProfile
var url = "mongodb://localhost:27017/quiz";
const UserProfile = require("../schemas/user_profile")

exports.userProfileSearch = async (req,res,next) =>{
  var idString = req.params.id
  const id = idString.replace(":","")
  console.log(id)
  try{
  await mongoose.connect(url)
  let user = await UserProfile.findById(id).exec()
  console.log(user)
  if(user == null){
    user = startProfile(id)
    user.save()
  }
  mongoose.disconnect()
  res.json(user)
  } catch (err){
    console.log("error")
    res.status(500).json({
      error: err.message
    })
  }
}

exports.updateUserProfile = async (req,res,next) =>{
  var idString = req.params.id
  const id = Number(idString.replace(":",""))
  console.log(id)
  try{
    console.log(req.body)
    await mongoose.connect(url)
    user = await UserProfile.findByIdAndUpdate(id,req.body)
    mongoose.disconnect()
    res.json(user)
  } catch (err){
    res.status(500).json({
      error: err.message
    })
  }
}
