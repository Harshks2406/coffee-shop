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
const { urlencoded } = require('express')
const passport = require('passport')

//mongo connection
// const url = 'mongodb://localhost/cafe' || process.env.MONGODB_URL
const url = "mongodb+srv://Harsh24:Despacito@cluster0.ok2gk.mongodb.net/cafe?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Database Connected")
})

// set template engine
app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


// Session config
app.use(session({
    secret: "thisismysecret",
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost/cafe'}), 
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24} //24 hours
}))

//Passport config
const passportInit = require("./app/config/passport")
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//Global middleware
app.use(function(req,res,next){
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(flash())

// Assets
app.use(express.static(__dirname +'/public'))
app.use(express.json())

require("./routes/web")(app)

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
}) 