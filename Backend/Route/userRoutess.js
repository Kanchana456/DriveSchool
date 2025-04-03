const express=require("express");
const router=express.Router();
const User=require("../Model/userModels");
const Usercontroller=require("../Controllers/Usercontroller");

router.get("/",Usercontroller.getAllUsers);
router.post("/",Usercontroller.addUsers);
router.get("/:id",Usercontroller.getById);
router.put("/:id",Usercontroller.updateUser);
router.delete("/:id",Usercontroller.deleteUser);

module.exports=router;