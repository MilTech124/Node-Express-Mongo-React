const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String ,
        required:[true,'Please add an adress'],
        unique :true
    },
    password:{
        type:String ,
        required:[true,'Please add an password'],
        unique :true
    },
    isAdmin:{
        type:Boolean,
        required:false,
        dafault: false
    }
},
    {
        timestamps:true
    }
)

module.exports= mongoose.model('User',userSchema)