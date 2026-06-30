import { verifyToken } from "../utils/jwt.js"


export const authMiddleware = (req,res,next) => {
    const token = req.cookies.mi_cookie
    if(!token) return res.json({status:"error",message:"Usuario no autenticado"})
    const user = verifyToken(token)
    if(!user) return res.json({status:"error",message:"Usuario no autenticado"})
    req.user = user
    next()
}