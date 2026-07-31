

export const isAdmin = (req,res,next)=>{
    if(req.decoded.role !== "admin") return res.json({message:"not authorized, admin only"})
        next()
}
