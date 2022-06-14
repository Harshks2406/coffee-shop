const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const path = require('path')
require('dotenv').config()
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')

//mongo connection
const url = 'mongodb://localhost/cafe'
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Database Connected")
})

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})


// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost/cafe'}), 
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24} //24 hours
}))

app.use(flash())

// Assets
app.use(express.static(__dirname +'/public'))
app.use(express.json())

require("./routes/web")(app)

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
}) 