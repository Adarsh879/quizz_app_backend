const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
    _id: {
        type : String, 
        required : true
    },

    mathsScore: {
        type: Number,
        Default: setDefaultScore,
    },

    computerScienceScore: {
        type: Number,
        Default: setDefaultScore,
    },

    GeneralKnowledgeScore: {
        type: Number,
        Default: setDefaultScore,
    }
})

function setDefaultScore() {
    return 0;
}

module.exports = mongoose.model('userProfileDocument',userProfileSchema,'userProfile')