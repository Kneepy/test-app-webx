import { FastifyInstance } from "fastify";
import PostController from "../controllers/post.controller";

export const privatePostRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.get("/posts/me", PostController.getMePosts)
    fastify.patch("/post", PostController.update)
    fastify.post("/post", PostController.create)

    done()
}

export const publicPostRoutes = (fastify: FastifyInstance, _, done: Function) => {
    fastify.get("/post", PostController.getOne)

    done()
}