const {promisify} = require('util')
const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
    return jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
}

exports.signup =  async (req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

        const token = jwt.sign({id:newUser._id,},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(201).json({
            status: "Success",
            data: {newUser, token}
        })
    }catch(err){
        res.status(400).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error ('provide email and password')
        }
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            throw new Error('Incorect email or password')
        }
        const token = signToken(user.id);
        res.status(201).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        })
    }catch(err){
        res.status(400).json({
            status: 'failed to login',
            message: err.message
        })
    }
}

exports.protect = async (req, res, next) => {
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
        }
        if(!token){
            throw new Error ('User was not authenticated')
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log('decoded', decoded)
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            throw new Error ('user not exist')
        }
        if(currentUser.changedPasswordAfter(decoded.iat)){
            throw new Error ('user changed password')
        }
        req.user = currentUser
    }catch(err){
        res.status(400).json({
            status:'failed in protection ',
            error: err.message
        })
    }
    next()
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                status: 'failed role',
                message: 'dont have permission to this action'
            })
        }
        next()
    }
}