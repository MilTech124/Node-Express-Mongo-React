const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    ticket:{
        type:String,
        required:true,
        ref:'Ticket'
    },
    text:{
        type:String ,
        required:[true,'Please enter a text'],        
    },
    isStaf:{
        type:Boolean ,
        default:false        
    },
    stafId:{
        type:String ,                
    },
  
},
    {
        timestamps:true
    }
)

module.exports= mongoose.model('Note',noteSchema)