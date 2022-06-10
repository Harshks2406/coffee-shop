const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

//mongo connection
const url = 'mongodb://localhost/cafe'
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Database Connected")
})

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// Assets
app.use(express.static(__dirname +'/public'))

require("./routes/web")(app)

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
}) 