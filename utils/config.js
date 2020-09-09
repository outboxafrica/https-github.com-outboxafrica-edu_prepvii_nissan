const passport=require('passport');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const Users=require('../models/user');
const {SECRET}=require('../config');

/**
 * to register the user
 */
const userRegister=async(userDets, role, res)=>{
 try{

    let usernameNotTaken=await validateUsername(userDets.username);
    if(!usernameNotTaken){
        return res.status(400).json({
            message : "User is already taken",
            success: false
        })
    }

    let emailNotRegistered=await validateEmail(userDets.email);
    if(!emailNotRegistered){
        return res.status(400).json({
            message: "Email taken",
            success: false
        })
    }
    const password=await bcrypt.hash(userDets.password, 12);
    const newUser = new Users({
    ...userDets,
    password,
    role
});
await newUser.save();

return res.status(201).json({
    message : "User created",
    success: true
});
 } catch(err){
    return res.status(500).json({
        message : "You are unable to create the data",
        success: false
    });

 }
}

const userLogin=async (userCreds, role, res)=>{
    let {username, password}=userCreds;
    const user=await Users.findOne({username});
    if(!user){
        return res.status(404).json({
            message: 'User not found. Invalid login credentials',
            success: false
        })
    }
    if(user.role !==role){
        return res.status(404).json({
            message: 'Kindly make sure that you are logging in from the correct portal',
            success: false
        })

    }
    let isMatch=await bcrypt.compare(password, user.password);
    if(isMatch){
       let token= await jwt.sign({
            user_id: user._id, 
            role: user.role,
            username: user.username,
            email: user.email
        }, SECRET, {expiresIn: '7 days'});
        let result={
            username: user.username,
            role : user.role,
            email: user.email, 
            token:`Bearer ${token}`, 
            expiresIn: 168
        };
        return res.status(200).json({
            ...result,
            message: 'You are now logged in',
            success: true
        })
    } else {
        return res.status(404).json({
            message: 'Incorrect password',
            success: false
        })
    }
}

const validateUsername=async username=>{
    let user=await Users.findOne({username});
    return user ? false :true;
}

const validateEmail=async email=>{
    let user=await Users.findOne({email});
    return user ? false : true;
}

/**
 * DESC passport middleware
 */
const userAuth=passport.authenticate('jwt', {session : false});

const checkRole=roles=>(req, res, next)=>{
    if(roles.includes(req.user.role)){
        return next()
    }
    return res.status(401).json({
        message: "You dont have permission to perform this action",
        success: false
    })

}
const serlializeUser=user=>{
    return {
        username : user.username,
        email: user.email,
        name: user.name,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    };
};

module.exports={
    checkRole,
    serlializeUser,
    userAuth,
    userLogin,
    userRegister
}