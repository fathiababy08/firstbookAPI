const express = require('express')
const app = express()
const PORT = 2100
const mongoose = require('mongoose')
const bookRouters = require('./routers/books')
const customerRouters = require('./routers/customer')
const auth = require('./middleware/auth')
require('dotenv/config')

// middleware
app.use(express.json())
app.use(bookRouters)
app.use(customerRouters)
app.get('/', auth, (req,res) => {
    console.log(req.user)
    res.send('auth worked')
})



// DB CONNECTION
const DB = () => {
    mongoose.connect(process.env.dburl)
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch(err=>{
        throw err
    })
}

// listening to server
app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT)
    DB()
    })

