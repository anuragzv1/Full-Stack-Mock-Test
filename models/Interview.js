const mongoose = require('mongoose');

//defining the Interview Model
const InterviewSchema = mongoose.Schema({
    company:String,
    passed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    failed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    notattempted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    onhold:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    date:String,

})
//Tell mongoose it is a model
const Interview = mongoose.model('Interview',InterviewSchema);

//export Interview Model
module.exports = Interview;