import express from "express"
import { dbConnection } from "./db/dbConnection.js"
import { userRoutes } from "./src/modules/user/user.routes.js"
import { productRoutes } from "./src/modules/product/product.routes.js"
import { cartRoutes } from "./src/modules/cart/cart.routes.js"
import { mailConfirmation } from "./src/middleware/mailConfirmation.js"
import cors from "cors"
const app = express()

dbConnection
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE']
}))

app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)


 let x = true

 const isAuth = (req,res,next)=>{
    req.ahmed="named"
    if(x) return next()
        res.json({message:"errorr"})
 }


 app.get("/",isAuth,(req,res)=>{
    console.log(req.ahmed);
    
    res.json({message:"Done"})
 })
app.listen(3000, ()=>{
    console.log("server running"); 
})