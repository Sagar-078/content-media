const mongoose = require("mongoose");

const contentModule = new mongoose.Schema({

    content: {
        type: String,
        trim: true,
        required: true,
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    likedusers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    
    createdAt: {
        type: Date,
       // required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Content", contentModule);