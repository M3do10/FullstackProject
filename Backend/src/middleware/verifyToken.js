import jwt from "jsonwebtoken"



export const verifyToke = (req,res,next)=>{
let token = req.headers.token
jwt.verify(token,"nti",(err,decoded)=>{
    if (err) return res.status(401).json({err})
        req.decoded = decoded
        next()
})
}