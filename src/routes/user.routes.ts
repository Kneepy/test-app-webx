import { FastifyInstance } from "fastify";
import UserContoller from "src/controllers/user.contoller";

export const userPrivateRoutes = (fastify: FastifyInstance) => {
    fastify.get("/user/me", UserContoller.getMe)
}
export const userPublicRoutes = (fastify: FastifyInstance) => {
    fastify.post("/user/registration", UserContoller.registration)
    fastify.put("/user/login", UserContoller.login)  
}
