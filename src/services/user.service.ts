import { UserModel } from "src/models/user.model"
import * as bcrypt from "bcryptjs"

class UserService {
    async registration({ email, password }) {
        const existUser = await UserModel.findOne({email})

        if (existUser.email) {
            throw new Error(`Пользователь с такой почтой уже существует`)
        }

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const user = await UserModel.create({email, password: passwordHash})
        
    }
}

export default new UserService()