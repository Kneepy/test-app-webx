import { FastifyInstance } from "fastify";
import UserContoller from "../controllers/user.contoller";

export const privateUserRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.get("/user/me", UserContoller.getMe)

    done()
}
export const publicUserRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.post("/user/registration", UserContoller.registration)
    fastify.put("/user/login", UserContoller.login)  

    done()
}
