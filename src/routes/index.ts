import { FastifyInstance } from "fastify"
import { userPrivateRoutes, userPublicRoutes } from "./user.routes"
import UserContoller from "../controllers/user.contoller"

export * from "./user.routes"
export default (fastify: FastifyInstance, _, done: Function) => {
    /**
     * Private routes
     */
    fastify.register((fastify) => {
        fastify.addHook("onRequest", UserContoller.auth)
        fastify.register(userPrivateRoutes)
    })

    /**
     * Public routes
     */
    fastify.register((fastify) => {
        fastify.register(userPublicRoutes)
    })

    done()
}