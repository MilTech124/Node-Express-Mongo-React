const asyncHandler = require ('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//Get user Tickets
const getTickets =asyncHandler( async(req,res) => {  
   //get user using id in JWT
   const user = await User.findById(req.user.id)

   if(!user){
      res.status(401)
      throw new Error ('User not found')
   }

   const tickets = await Ticket.find({user:req.user.id})
   res.status(200).json(tickets)
})
//Get user Ticket
const getTicket =asyncHandler( async(req,res) => {  
   //get user using id in JWT
   const user = await User.findById(req.user.id)

   if(!user){
      res.status(401)
      throw new Error ('User not found')
   }

   const ticket = await Ticket.findById(req.params.id)

   if(!ticket){
      throw new Error('Ticket not found')
   }
   if(ticket.user.toString()!==req.user.id){
      res.status(401)
      throw new Error('not Auth')
   }

   res.status(200).json(ticket)
})

//Create new Ticket
const createTicket=asyncHandler( async(req,res) => {  
   const {product,description} =req.body

   if(!product || !description){
      res.status(400)
      throw new Error('please add a product and description')
   }

   const user = await User.findById(req.user.id)

   if(!user){
      res.status(401)
      throw new Error ('User not found')
   }

   const ticket = await Ticket.create({
      product,
      description,
      user:req.user.id,
      status:'new'
   })


   res.status(201).json(ticket)
})

//Delete Ticket
const deleteTicket =asyncHandler( async(req,res) => {  
   //get user using id in JWT
   const user = await User.findById(req.user.id)

   if(!user){
      res.status(401)
      throw new Error ('User not found')
   }

   const ticket = await Ticket.findById(req.params.id)

   if(!ticket){
      throw new Error('Ticket not found')
   }
   if(ticket.user.toString()!==req.user.id){
      res.status(401)
      throw new Error('not Auth')
   }

   await  ticket.remove()
   res.status(200).json({succes:true})
})

//Update Ticket
const updateTicket =asyncHandler( async(req,res) => {  
   //get user using id in JWT
   const user = await User.findById(req.user.id)

   if(!user){
      res.status(401)
      throw new Error ('User not found')
   }

   const ticket = await Ticket.findById(req.params.id)

   if(!ticket){
      throw new Error('Ticket not found')
   }
   if(ticket.user.toString()!==req.user.id){
      res.status(401)
      throw new Error('not Auth')
   }
   
   const updatedTicked = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})

   res.status(200).json(updatedTicked)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
}