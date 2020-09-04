const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const User=require('../models/userModel');
//const key=require('../middleware/keys')

router.post('/signup', (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message : "User already exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user=new User({
                    _id: new mongoose.Types.ObjectId(),
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash
                })
                user.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: 'User successfully created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                })
            }
        })

        }   
    })  
})
router.post('/login', (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message: 'Password or email does not exist'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message : 'Password or email does not exist'
                })
            }
            if(result){
                //adding a web token
           const token=jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            }, 
        
            process.env.JWT_KEY,

            {
                expiresIn: "1hr"
            }
            )
                return res.status(200).json({
                    message : "Login successful",
                    token : token
                })
            }
            res.status(401).json({
                message: 'Token'
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.delete('/:userId', (req, res, next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message : "User deleted"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

module.exports=router