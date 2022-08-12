const mongoose = require("mongoose")

function deleteKeys(quizModel)  {
    for await (const question of quizModel.find({})) {
        question.set('difficulty', undefined, { strict: false })
        await question.save()
      }
}

exports.startProfile = deleteKeys