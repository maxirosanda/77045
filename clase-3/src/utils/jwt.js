import jwt from "jsonwebtoken"

export const generateToken = ({id, first_name, last_name}) =>{
    const user = {id, first_name, last_name}
    const accessToken = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:"1h"})
    return accessToken

}

export const verifyToken = (token) =>{
   return jwt.verify(token,process.env.JWT_SECRET)
}

