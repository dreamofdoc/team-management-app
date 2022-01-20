import mongoose from "mongoose";
import {compare, hash} from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    team: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 100,
        lowercase: true,
        unique: true,
        required: true,
        validate (value) {
            if (!validator.isEmail(value)) throw new Error('Enter valid email');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) this.password = await hash(this.password, 8);
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;