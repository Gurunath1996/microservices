const mongoose=require('mongoose')
const {Post, validatePosts}=require('./posts-module')
const lodash = require('lodash')
const express =require('express')
const router=express.Router()

router.get('/', async (req,res)=>{
    const posts= await Post.find()
    res.send(posts)
})

router.get('/:id', async (req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post) res.status(404).send('The Product Id not found')  
    res.send(post)
})

router.post('/', async (req,res)=>{
    const result= validatePosts(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } 

    let post= new Post(lodash.pick(req.body,["title","content","author","imageURL","date"]))
    try{
        post= await post.save()
        res.send(post)
    }
    catch(err){res.send(err)}
    
})

router.put('/:id', async (req,res)=>{
    const up= lodash.pick(req.body,["title","content","author","imageURL","date"])

    const post= await Post.findByIdAndUpdate(req.params.id,{up},{new:true})
    if(!post) res.status(404).send('The Product Id not found')

    const result= validatePosts(req.body)
    if (result.error)  res.status(400).send(result.error.details[0].message)

    post.title = req.body.title
    post.content = req.body.content
    post.author = req.body.author
    post.imageURL = req.body.imageURL
    post.date = req.body.date   
    res.send(post)
})

router.delete('/:id', async (req,res)=>{
    const post=await Post.findByIdAndRemove(req.params.id)
    if(!post) res.status(404).send('The Product Id not found')  
    res.send(post)
})

module.exports=router;