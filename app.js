const express = require('express');
const bodyparser = require('body-parser');
var router = express.Router();

var app = express();
app.use(bodyparser.urlencoded({
    extended: false 
}));
app.use(bodyparser.json());
app.use(router);

// Starting server 
app.listen(process.env.PORT || 3000, function() {
    console.log("Server, listening on port 3000");
});

//endpoints
router.get('/', function(req,res, next) {
    res.status(200).json({message: 'Default Route works'})
});

app.use('/quiz',require('./routes/quiz_picker'));