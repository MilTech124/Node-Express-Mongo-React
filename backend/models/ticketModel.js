const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    product:{
        type:String ,
        required:[true,'Please select a product'],
        enum:['phone','Macbock Pro','iMac']
    },
    description:{
        type:String ,
        required:[true,'Please enter a description'],        
    },
    status:{
        type:String,
        required:true,        
        enum:['new','open','closed'],
        dafault: 'new',
    }
},
    {
        timestamps:true
    }
)

module.exports= mongoose.model('Ticket',ticketSchema)