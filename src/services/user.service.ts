import { UserModel } from "../models/user.model"
import * as bcrypt from "bcryptjs"
import { INVALID_PASSWORD, USER_ALREADY_EXIST } from "../constants/errors"
import { BaseException } from "../exceptions/base.exception"

class UserService {
    async registration({ email, password }) {
        const existUser = await UserModel.findOne({ email })

        if (existUser?.email) throw BaseException.BadRequest(USER_ALREADY_EXIST)

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const user = await UserModel.create({email, password: passwordHash})
        
        return user
    }
    async login({ email, password }) {
        const user = await UserModel.findOne({ email })
        const comparePassword = await bcrypt.compare(password, user.password)

        if(!comparePassword) throw BaseException.BadRequest(INVALID_PASSWORD)

        return user
    }
}

export default new UserService()