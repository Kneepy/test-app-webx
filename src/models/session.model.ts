import mongoose, { Schema } from "mongoose"
import { UserModel } from "./user.model"

const SessionSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: UserModel},
    fingerprint: {type: String, required: true}, // это типа уникальный ключ которым мы помечаем устройство
    createdAt: {type: String, required: true},
})

export const SessionModel = mongoose.model("Session", SessionSchema)