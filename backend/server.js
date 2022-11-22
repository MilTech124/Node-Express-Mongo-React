const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000
const app = express()

/* Connect to the database */
connectDB()

/* Object returned will be undefined if there are not these 2 lines
Get the body parser
*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// connect api/... to the required router file
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Serve Frontend

if(process.env.NODE_ENV==='production'){
    //set Build folder as static
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*',(req,res)=>res.sendFile(__dirname,'../','frontend','build','index.html'))
}else{
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Welcome to Hung's support desk" })
    })
}

app.use(errorHandler)

app.listen(PORT () => console.log(`Running on port ${PORT}`))