const express = require('express');
const router = express.Router();
const User = require('../models/user')

//getting all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//getting one 
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//creating one
router.post('/', async (req, res) => {
    const user = new User ({
        username: req.body.username, 
        account: req.body.account
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({ message: err.message})
    }
})

//updating one 
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.username != null){
        res.user.username = req.body.username
    }
    if(req.body.account != null){
        res.user.account = req.body.account
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

//deleting one 
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({ message: 'User deleted' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//creating a middleware 
async function getUser(req, res, next){
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({ message: 'User not found' })
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()

}

module.exports = router