const UserProfile = require("../schemas/user_profile")

function startProfile(id){
    return UserProfile({
      _id: id,
      mathsScore: 0,
      computerScienceScore: 0,
      GeneralKnowledgeScore: 0,
    })
  }

  exports.startProfile = startProfile