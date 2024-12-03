
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose");

const userScheme=new Scheme({
    email:{
        type:String,
        required :true,
    }
});

userScheme.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userScheme);