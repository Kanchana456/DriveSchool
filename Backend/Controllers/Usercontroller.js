const User=require("../Model/userModels");
const getAllUsers=async(req,res,next)=>{
    
    let Users;

    try{
        Users=await User.find();

    }catch(err){
        console.log(err);

    }
    if(!Users){
        return res.status(404).json({message:"user not found"});
    }

    return res.status(200).json({Users});

};

 const addUsers=async(req,res,next)=>{
    const{name, age, startDate, studentProgress}=req.body;
    let users;

    try{
        users=new User({name, age, startDate, studentProgress});
        await users.save();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).send({message:"unable to add users"});
    }
    return res.status(200).json({users});
 };

 const getById=async(req,res,next)=>{
    const id=req.params.id;
    let user;

    try{
        user=await User.findById(id);
    }catch(err){
        console.log(err);
    }

    
    if(!user){
        return res.status(404).send({message:"user not found"});
    }
    return res.status(200).json({user});
 }

 const updateUser=async(req,res,next)=>{
    const id=req.params.id;
    const{name, age, startDate, studentProgress}=req.body;
    let users;
    
    try{

        if (studentProgress) {
            const validProgressValues = ['Not Started', 'Theory Learning', 'Theory Test Passed', 'Practical Training', 'Ready for License Test', 'Licensed'];
            if (!validProgressValues.includes(studentProgress)) {
                return res.status(400).json({ message: "Invalid student progress value" });
            }
        }

        const updateData = {
            ...(name && { name }),
            ...(age && { age }),
            ...(startDate && { startDate: new Date(startDate) }),
            ...(studentProgress && { studentProgress })
        };

        users = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Error updating user", error: err.message });
    }

    if(!users){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({users});
 };

 const deleteUser =async(req,res,next)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    
    if(!user){
        return res.status(404).send({message:"unable to delete"});
    }
    return res.status(200).json({user});
 };
exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;