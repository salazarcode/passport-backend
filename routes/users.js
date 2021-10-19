require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Getting all

router.get('/', Auth, async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting One

router.get('/:id', Auth, getUser, (req,res) => {
    res.json(res.user)
})

//Creating One

router.post('/', Auth, async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        occupation: req.body.occupation,
        password: req.body.password,
        seed: req.body.seed,
        address: req.body.address,
        privatekey: req.body.privatekey,
        publickey: req.body.publickey,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err) {
        res.status(400).json(err.message)
    }
    
})

//Authenticating One

router.post('/auth/', Auth, authUser, async (req, res) => {
    res.json(res.user)
})

//Updating One

router.patch('/:id', Auth, getUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.phone != null){
        res.user.phone = req.body.phone
    }
    if(req.body.country != null){
        res.user.country = req.body.country
    }
    if(req.body.occupation != null){
        res.user.occupation = req.body.occupation
    }
    if(req.body.password != null){
        res.user.password = req.body.password
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Deleting One

router.delete('/:id', Auth, getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: 'El usuario ha sido eliminado'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getUser(req,res,next){
    let user
    try{
        user = await User.findOne({email:req.params.id})

        if(user == null){
            return res.status(404).json({message:'El usuario no ha sido encontrado.'})
        }

    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

async function authUser(req, res, next){
    let user
    try{
        user = await User.findOne({email:req.body.email})

        if(user == null){
            return res.status(404).json({message:'El usuario no ha sido encontrado.'})
        }

    } catch(err){
        return res.status(500).json({message: err.message})
    }

    if (req.body.password != user.password){
        return res.status(404).json({message:'La contraseña para este usuario es incorrecta.'})
    }

    res.user = user
    next()
}

async function Auth(req,res,next){
    let secret = process.env.SECRET_KEY
    if( req.headers.authorization != secret){
        return res.status(403).json({message:'Su Secret Key no es válida o no fue enviada como header "Authorization"'})
    }else {
        console.log('Authenticated correctly')
        next()
    }
    
}



module.exports = router

