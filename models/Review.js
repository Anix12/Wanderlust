const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let ReviewScheme = new Scheme({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Scheme.Types.ObjectId,
        ref: "User",
    }
});

module.exports=mongoose.model("Review", ReviewScheme);