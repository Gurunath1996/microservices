const express = require('express')
const mongoose = require('mongoose')
const app=express()
const posts=require('./posts-route')

mongoose.connect("mongodb://localhost/post")
    .then(()=>console.log('Connected to mongoDb...'))
    .catch((err)=>console.log('Could not connect to mongoDb',err))

app.use(express.json())
app.use('/api/posts',posts)




app.listen(2500, ()=>console.log('Listening to port 2500...'))