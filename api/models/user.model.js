import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    },
    
        password:{
            type: String,
            required: true,
        },

        temporaryPassword: { 
            type: String,
            resetPasswordExpires: Date, 
        },

        newPassword: { // Field to temporarily store the new password during reset
            type: String,
        },

        
        profilePicture: { // if the user did not provider any image i wanna add a default  picture
            type: String,
            default:
              'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
          },
        },
    
 {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;