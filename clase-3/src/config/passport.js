import passport from "passport";
import passportJWT from "passport-jwt"
import { UserModel } from "../models/user.model.js";
import dotenv from "dotenv"
import localStrategy from "passport-local"
import githubStrategy from "passport-github2"
import { createHash,isValidPassword } from "../utils/hash.js";

dotenv.config()

const cookieExtractor = (req) =>{
    return req && req.cookies ? req.cookies["mi_cookie"] : null
}

const jwtConfig = {
    jwtFromRequest:passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:process.env.JWT_SECRET
}

export const intialisePassport = () => {

    passport.use("jwt",new passportJWT.Strategy(jwtConfig,async (payload,done)=>{
        try {
            const user = await UserModel.findOne({_id:payload.id})
            if(!user) return done(null,false,{message:"No existe usuario con ese correo"})
            return done(null,user)
        } catch (error) {
            return done(error,false,{message:"Error al obtener el usuario"})
        }
    }))

    passport.use("register",new localStrategy.Strategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback:true
    },async (req, userName,password,done)=>{

        const {first_name ,last_name } = req.body
        
            const firstNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,20}$/;
            const lastNameRegex  = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,20}$/;
            const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex  = /^.{6,}$/;
        
            if(!first_name || !firstNameRegex.test(first_name)) return done(null,false,{message:"El nombre solo debe contener letras, mínimo 3 y máximo 20 caracteres"})
            if (!last_name || !lastNameRegex.test(last_name)) return done(null,false,{message: "El apellido solo debe contener letras, mínimo 3 y máximo 20 caracteres" });
            if (!userName || !emailRegex.test(userName)) return done(null,false,{message: "El email no tiene un formato válido" });
            if (!password || !passwordRegex.test(password)) return done(null,false,{message: "La contraseña debe tener al menos 6 caracteres" });
            
            try {
                const exist = await UserModel.findOne({email:userName})
                if(exist) return done(null,false,{message:"Ya existe un usuario con este email"})
                const hashPassword = createHash(password)
                const newUser = await UserModel.create({first_name, last_name, email:userName, password:hashPassword})

                const userForToken = {
                    id:newUser._id,
                    first_name:newUser.first_name,
                    last_name:newUser.last_name,
                    role:newUser.role
                }
                done(null,userForToken)
            } catch (error) {
                done(error,false,{message:"Error interno del servidor"})
            }

    }) )

    passport.use("login",new localStrategy.Strategy({
        usernameField:"email",
        passwordField:"password",
    }, async (userName,password,done)=>{
            const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex  = /^.{6,}$/;
        
            if (!userName|| !emailRegex.test(userName)) return done(null,false,{message: "El email no tiene un formato válido" });
            if (!password || !passwordRegex.test(password)) return done(null,false,{message: "La contraseña debe tener al menos 6 caracteres" });
            
            try {
                const user = await UserModel.findOne({email:userName})
        
                if(!user) return done(null,false,{message:"Usuario inexistente"})
                
                const validPassword = isValidPassword(password,user.password)
            
                if(!validPassword) return done(null,false,{message:"Pasword invalido"})
                    
                const userForToken = {
                        id:user._id,
                        first_name:user.first_name,
                        last_name:user.last_name,
                        role:user.role
                }
                done(null,userForToken)
            } catch (error) {
                done(error,false,{message:"Error interno del servidor"})
            }
        
    }))

    passport.use("github",new githubStrategy.Strategy({
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL
    },async (_,__,profile,done)=>{
        try {
            const user = await UserModel.findOne({gitHubId:profile._json.id})
            if(user){
                const userForToken = {
                        id:user._id,
                        first_name:user.first_name,
                        last_name:user.last_name,
                        role:user.role
                }
                done(null,userForToken)
            }
            const newUser = {
                githubId:profile._json.id,
                fist_name:profile._json.name,

            }

            const userCreated = await UserModel.create(newUser)
            const userForToken = {
                        id:user._id,
                        first_name:user.first_name,
                        last_name:user.last_name ? user.last_name : "",
                        role:user.role
            }
            return done(null,userForToken)


        } catch (error) {
            
        }
    }))

}