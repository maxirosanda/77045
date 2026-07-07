import { UserModel } from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hash.js"
import { generateToken } from "../utils/jwt.js"


const login = async (req,res) => {
    const token = generateToken(req.user)
    res.cookie("mi_cookie",token,{httpOnly:true, maxAge: 60*60*1000})
    return res.status(200).json({message:"Usuario autenticado correctamente"})
}

const register = async (req,res)=>{
    return res.status(201).json({"message":"Usuario registrado correctamente"})
}

const logout = (req, res) => {
   res.clearCookie('mi_cookie').status(200).json({status: 'success',message:'Logout Correcto'})
}

const currentUser = (req,res) =>{
    res.status(200).json({status:"success",payload:req.user})
}

const github = (req,res) => {
    const token = generateToken(req.user)
    res.cookie("mi_cookie",token,{httpOnly:true, maxAge: 60*60*1000})
    return res.status(200).json({message:"Usuario autenticado correctamente"})
}

export const sessionsController = {
    login,
    github,
    register,
    currentUser,
    logout
}




