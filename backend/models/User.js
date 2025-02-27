const mdb=require('mongoose');

const userSchema=mdb.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobile:Number
})

const user_Schema=mdb.model("signup",userSchema)
module.exports = user_Schema
