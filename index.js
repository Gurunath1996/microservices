const express = require('express')
const mongoose = require('mongoose')
const app=express()
const register=require('./route')


mongoose.connect("mongodb://localhost/register")
    .then(()=>console.log('Connected to mongoDb...'))
    .catch((err)=>console.log('Could not connect to mongoDb',err))

app.use(express.json())
app.use('/api/register',register)




app.listen(2000, ()=>console.log('Listening to port 2000...'))