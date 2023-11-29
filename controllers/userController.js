const User = require ("../models/userModel");

const asyncHandler = require ("express-async-handler");
const {generateToken} = require("../config/jwtToken");
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require("jsonwebtoken");
//const sendEmail = require('./emailController')
const crypto = require("crypto");

//to=do
// - farmer login
// - adjust other logins

//Create a new user
const createUser = asyncHandler(async (req,res)=>{
    //const email = req.body.email;
   const { email, role } = req.body;
   
   if (!role || !email) {
      throw new Error("All fields are required!")
   }
    const findUser = await User.findOne({email: email, role: role});
    if(!findUser){
        const newUser = await User.create(req.body)
        res.json(newUser);
    } else{
        throw new Error("user already exists")
    }

});

//Login User
// const loginUser = asyncHandler(async (req, res)=>{
//     const { username, password} = req.body;
//     //check if user exists
//     const findUser = await User.findOne({username});
//     if(findUser && await findUser.isPasswordMatched(password)){
//          const refreshToken = await generateRefreshToken(findUser?._id);
//          const updateuser = await User.findByIdAndUpdate(findUser.id, {
//             refreshToken: refreshToken,
//          },
//           {new:true}
//           );
//           res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             maxAge: 72 * 60 * 60 * 1000,
//           });
//         res.json({
//             _id: findUser?._id,
//             fullname: findUser?.fullname,
//             email: findUser?.email,
//             token: generateToken(findUser?._id),
//             })
//     } else {
//         throw new Error('Invalid Password');
//     }
    
// });


//Farmer Login
const loginFarmer = asyncHandler(async (req, res)=>{
   const { email, password} = req.body;
   //check if user exists
   const findFarmer = await User.findOne({email});
   if (findFarmer.role !== "farmer") throw new Error("Not Authorized")
   if(findFarmer && await findFarmer.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findFarmer?._id);
        const updateuser = await User.findByIdAndUpdate(findFarmer.id, {
           refreshToken: refreshToken,
        },
         {new:true}
         );
         res.cookie("refreshToken", refreshToken, {
           httpOnly: true,
           maxAge: 72 * 60 * 60 * 1000,
         });
       res.json({
           _id: findFarmer?._id,
           fullname: findFarmer?.fullname,
           email: findFarmer?.email,
           farmName: findFarmer?.farmName,
           farmLocation: findFarmer?.farmLocation,
           token: generateToken(findFarmer?._id),
           })
   } else {
       throw new Error('Invalid Credentials');
   }
   
});


//Consumer Login
const loginCustomer = asyncHandler(async (req, res)=>{
   const { email, password} = req.body;
   //check if user exists
   const findCustomer = await User.findOne({email});
   if (findCustomer.role !== "farmer") throw new Error("Not Authorized")
   if(findCustomer && await findCustomer.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findCustomer?._id);
        const updateuser = await User.findByIdAndUpdate(findCustomer.id, {
           refreshToken: refreshToken,
        },
         {new:true}
         );
         res.cookie("refreshToken", refreshToken, {
           httpOnly: true,
           maxAge: 72 * 60 * 60 * 1000,
         });
       res.json({
           _id: findCustomer?._id,
           fullname: findCustomer?.fullname,
           email: findCustomer?.email,
           location: findFarmer?.location,
           token: generateToken(findCustomer?._id),
           })
   } else {
       throw new Error('Invalid Credentials');
   }
   
});


//Admin login
const loginAdmin = asyncHandler(async (req,res)=>{
   const {email, password} = req.body
   //check if user exists
   const findAdmin = await User.findOne({email});
   if (findAdmin.role !== "admin") throw new Error("Not Authorized")
   if(findAdmin && await findAdmin.isPasswordMatched(password)){
     const refreshToken = await generateRefreshToken(findAdmin?._id);
     const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
        refreshToken: refreshToken,
     },
      {new:true}
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        fullname: findAdmin?.fullname,
        email: findAdmin?.email,
        token:generateToken(findAdmin?._id),
      })
   }else{
     throw new Error("Invalid Credentials")
   }
})

 //handle refresh token
 const handleRefreshToken = asyncHandler(async ( req,res)=>{
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token In Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if (!user) throw new Error("No Refresh token present in db or not matched")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded)=>{
      if (err || user.id !== decoded.id) {
       throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id)
      res.json({accessToken})
    });
 });

 //logout functionality
 const logOut = asyncHandler(async (req, res)=>{
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token In Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if (!user) {
       res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
       });
       return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate({refreshToken,
       refreshToken: "",
    });
    res.clearCookie("refreshToken", {
       httpOnly: true,
       secure: true,
    });
    return res.sendStatus(204); //forbidden
 });


// //update a user
const updateaUser = asyncHandler(async (req,res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try{
     const updateUser = await User.findByIdAndUpdate(
       _id, 
       {
         firstname: req?.body?.firstname,
         lastname: req?.body?.lastname,
         email: req?.body?.email,
     },
     {
       new: true,
     });
     res.json(updateUser)
    }catch (error) {
       throw new Error (error)
    }
 });


 //get all users
 const getallUsers = asyncHandler(async (req, res)=>{
    try {
       const getUsers = await User.find();
       res.json(getUsers);
    } catch (error) {
       throw new Error (error);
    }
 })

 //get a single user
 const getaUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
       const getUser = await User.findById(id);
       res.json(getUser);
    } catch (error) {
       throw new Error (error)
    }

 });

  //delete a user
  const deleteaUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try {
       const deleteaUser = await User.findByIdAndDelete(id);
       res.json(deleteaUser);
    } catch (error) {
       throw new Error (error)
    }

 });


 //update password
 const updatePassword = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {password} = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
       user.password = password;
       const updatedPassword = await user.save();
       res.json(updatedPassword);
    } else {
       res.json(user);
    }
 });
 

//forgot password
const forgotPasswordToken = asyncHandler (async (req,res)=>{
    //get user based on posted email
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) throw new Error("User not found with this email");
      try{

         // create token
         const token = await user.createPasswordResetToken();
         await user.save();
         const resetURL = `Hi, Please follow this link to reset your password. This link is valid for 10minutes.<a href= 'http://localhost:3012/api/user/reset-password/${token}'>Click here</>`;

         //create data object
         const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Hey User",
            htm: resetURL,
         };
         sendEmail(data);
        // res.json(token);
        res.json({
         message : " proceed to your email for the reset link"
        });
      }
      catch (error) {
         throw new Error (error);
      }
   });


//reset pasword
const resetPassword = asyncHandler(async(req, res)=>{
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
       passwordResetToken: hashedToken,
       passwordResetExpires: {$gt: Date.now()},
    });
    if(!user) throw new Error("Token expired, please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
 });




module.exports = {createUser, loginFarmer , resetPassword, forgotPasswordToken, getaUser, getallUsers,handleRefreshToken, logOut, updatePassword, deleteaUser, updateaUser, loginAdmin, loginCustomer}