import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be uniqe']
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, 'username must be unique']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)

export default User;