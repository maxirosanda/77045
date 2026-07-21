export const autorizeRoles = (...roles) => {
    return (req,res,next) =>{
        if(!req.user){
            return req.status(401).json({
                status:"error",
                message:"Usuario no autenticado"
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status:"error",
                message:"No tienes permisos para acceder a este recurso"
            })
        }
        next()
    }
}