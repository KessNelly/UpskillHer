const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    farmName:{
        type:String,
    },
    role:{
        type:String,
        default: "farmer",
    },
    farmLocation:{
        type:String,
    },
    refreshToken: {  
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    timestamps: true,
});


//hash password
userSchema.pre('save', async function (next){
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
});

//password for login functionality
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};

//password Reset
userSchema.methods.createPasswordResetToken = async function(){
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken= crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordResetExpires= Date.now()+30*60*1000; // 10 minutes
    return resettoken
};


//Export the model
module.exports = mongoose.model('User', userSchema);