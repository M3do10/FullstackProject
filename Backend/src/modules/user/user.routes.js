import { checkEmail } from "../../middleware/checkEmail.js"
import { getUsers, login, signUp, verifyAccount, updateUser, deleteUser } from "./user.controller.js"

import express from "express"
export const userRoutes = express.Router()


userRoutes.use(express.json())

userRoutes.post("/users/signup", checkEmail,signUp)

userRoutes.post("/users/login", login)

userRoutes.get("/users/verify/:mail",verifyAccount)

userRoutes.get("/users",getUsers)

userRoutes.put("/users/:id", updateUser)

userRoutes.delete("/users/:id", deleteUser)
