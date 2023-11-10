const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//token verification
const authMiddleware = asyncHandler(async (req,res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    try{
if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    req.user = user;
    next();
}
    }catch (error){
        throw new Error ("Not Authorized, token expired, Please Login Again");
    }
    } else {
        throw new Error("There is no token attached to header")
    }
});

//admin verification
const isAdmin = asyncHandler(async (req, res, next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error("You are not an Admin!")
    }else{
        next();
    }
});

//produce authorization middleware
// Authorization middleware
const authenticate= async (req, res, next) => {
    const produceId = req.params.id;
    const farmerId = req.user.farmer;
  
    try {
      const existingProduce = await Produce.findOne({ _id: produceId, farmer: farmerId });
  
      if (!existingProduce) {
        return res.status(404).json({ error: 'Produce  not found or unauthorized' });
      }
      req.produce = existingProduce;
      next();
    } catch (error) {
     // console.error(error);
      res.status(500).json({ error: 'Error while validating' });
    }
  };

  
// authenticationMiddleware.js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
 if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded.userId;
    next();
  });
};
module.exports = {authMiddleware , isAdmin,verifyToken,authenticate}