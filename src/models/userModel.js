import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username : {
        type: String,
        required: [true , 'Please provide a ussername'],
        unique: [true, 'Please enter unique username'],
        trim:[true, "Don't use any spaces"]
    },

    email : {
        type: String,
        required: [true , 'Please provide a ussername'],
        unique: [true, 'Please enter unique username'],
        trim: true,
        lowercase: true,
       
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [12, 'Password must be at least 12 characters long'],
        maxlength: [64, 'Password must be at most 64 characters long'],
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry : Date

})

const User = mongoose.model.users || mongoose.model("users", userSchema)

export default User;

