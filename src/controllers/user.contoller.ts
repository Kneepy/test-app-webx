import { FastifyReply, FastifyRequest } from "fastify";
import { RegistrationUserDTO } from "src/dtos/user-dtos/registration-user.dto";
import UserService from "src/services/user.service";

class UserController {
    async registration({ body }: FastifyRequest<RegistrationUserDTO>, reply: FastifyReply) {
        try {
            const { email, password } = body

            UserService.registration({ email, password })
        } catch (e) {

        }
    }
    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            
        } catch (e) {

        }
    }
}

export default new UserController()