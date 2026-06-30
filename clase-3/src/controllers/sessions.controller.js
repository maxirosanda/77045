import { UserModel } from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hash.js"
import { generateToken } from "../utils/jwt.js"

const login = async (req,res) => {
    const {email, password} = req.body
    const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex  = /^.{6,}$/;

    if (!email || !emailRegex.test(email)) return res.json({ status: "error", message: "El email no tiene un formato válido" });
    if (!password || !passwordRegex.test(password)) return res.json({ status: "error", message: "La contraseña debe tener al menos 6 caracteres" });
    
    const user = await UserModel.findOne({email})

    if(!user) return res.json({status:"error",message:"Usuario inexistente"})
    
    const validPassword = isValidPassword(password,user.password)

    if(!validPassword) return res.json({status:"error",message:"Pasword invalido"})

    const token = generateToken({id:user.id,first_name:user.first_name,last_name:user.last_name,role:user.role})
    
    res.cookie("mi_cookie",token,{httpOnly:true,maxAge:60*60*1000}).json({status:"success",message:"Login exitoso"})
}
const register = async (req,res)=>{

    const {first_name ,last_name, password, email } = req.body

    const firstNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,20}$/;
    const lastNameRegex  = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,20}$/;
    const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex  = /^.{6,}$/;

    if(!first_name || !firstNameRegex.test(first_name)) return res.json({status:"error", message:"El nombre solo debe contener letras, mínimo 3 y máximo 20 caracteres"})
    if (!last_name || !lastNameRegex.test(last_name)) return res.json({ status: "error", message: "El apellido solo debe contener letras, mínimo 3 y máximo 20 caracteres" });
    if (!email || !emailRegex.test(email)) return res.json({ status: "error", message: "El email no tiene un formato válido" });
    if (!password || !passwordRegex.test(password)) return res.json({ status: "error", message: "La contraseña debe tener al menos 6 caracteres" });
    
    const exist = await UserModel.findOne({email})
    if(exist) return res.json({status:"error",message:"Ya existe un usuario con este email"})
    const hashPassword = createHash(password)
    const newUser = await UserModel.create({first_name, last_name, email, password:hashPassword})

    res.json({status:"success",message:"",payload:{
        id:newUser._id,
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        email:newUser.email,
        role:newUser.role
    }})
}

const logout = (req, res) => {
   res.clearCookie('mi_cookie').status(200).json({status: 'success',message:'Logout Correcto'})
}

const currentUser = (req,res) =>{
    res.status(200).json({status:"success",payload:req.user})
}

export const sessionsController = {
    login,
    register,
    currentUser,
    logout
}




