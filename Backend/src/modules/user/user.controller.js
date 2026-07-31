import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailConfirmation } from "../../middleware/mailConfirmation.js";


async function signUp(req, res) {
    try {
        await mailConfirmation(req.body.email);
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        let addedUser = await userModel.insertMany(req.body);
        console.log(addedUser, "added");
        addedUser[0].password = undefined;
        res.status(201).json({ message: "user registered successfully", addedUser });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Registration failed. Could not send verification email." });
    }
}


 function verifyAccount(req,res){
    jwt.verify(req.params.mail,"ourMail", async(err,decoded)=>{
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(400).json({message:"Invalid or expired token. Please sign up again or contact support."});
        }
        let confirmUser =await userModel.findOneAndUpdate({email:decoded.mail},{isConfirmed:true})
        res.json({message:"verified"})
    })
}

async function login(req,res){
    let foundedUser = await userModel.findOne({email:req.body.email})
    if(foundedUser){
        if(foundedUser.isConfirmed===false) return res.status(401).json({message:"please verify your email"})
      let matchedPass = bcrypt.compareSync(req.body.password,foundedUser.password)
      let token = jwt.sign({_id:foundedUser._id, role:foundedUser.role},"nti")
      const fname = foundedUser.fname || foundedUser.email.split('@')[0];
      if(matchedPass) return res.json({message:"logged in successfully", token, fname})
        res.json({message:"email or password incorrect"})
    }else{
        res.json({message:"user not found"})
    }
}


async function getUsers(req,res){
    let users = await userModel.find()
    
    res.json({message:"all users", users})
}

async function updateUser(req, res) {
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
        }
        let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "user not found" });
        updatedUser.password = undefined;
        res.json({ message: "user updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}

async function deleteUser(req, res) {
    try {
        let deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "user not found" });
        res.json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}

export{
    signUp,
    getUsers,
    login,
    verifyAccount,
    updateUser,
    deleteUser
}