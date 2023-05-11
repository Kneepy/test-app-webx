import { FastifyInstance } from "fastify";
import UserContoller from "../controllers/user.contoller";

export const userPrivateRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.get("/user/me", UserContoller.getMe)

    done()
}
export const userPublicRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.post("/user/registration", UserContoller.registration)
    fastify.put("/user/login", UserContoller.login)  

    done()
}
