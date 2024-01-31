import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: [
            {
                validator: function (value) {

                    // Regular expression

                    return /^[A-z][A-Za-z0-9-_]{3,23}$/.test(value);
                },
                message: "username does not have to special characters"
            }
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;