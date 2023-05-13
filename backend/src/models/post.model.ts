import mongoose, { Schema, InferSchemaType } from "mongoose";
import { UserModel } from "./user.model";

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    media: {type: String, required: false},
    createdAt: {type: String, required: true},
    user: {ref: UserModel, type: Schema.Types.ObjectId, required: true}
})

export interface Post extends InferSchemaType<typeof PostSchema> {}

export const PostModel = mongoose.model("Post", PostSchema)