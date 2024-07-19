const express=require("express")
const router=express.Router()
const {Signup}=require("../controller/Signup")
const {login}=require("../controller/Login")
router.post("/signup",Signup)
router.post("/login",login)

module.exports=router