import mongoose, { InferSchemaType, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export interface User extends InferSchemaType<typeof UserSchema> {}

export const UserModel = mongoose.model("User", UserSchema)