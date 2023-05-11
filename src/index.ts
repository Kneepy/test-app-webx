import Fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import FastifyCookie from "@fastify/cookie";
import { userPrivateRoutes, userPublicRoutes } from "./routes";
import UserContoller from "./controllers/user.contoller";

const fastify = Fastify({
    logger: false
})

fastify.register(FastifyCookie)

/**
 * Маршруты общей области видимости
 * Т.е те для которых не нужна авторизация
 */
fastify.register((fastify: FastifyInstance, _, done: Function) => {
    fastify.register(userPublicRoutes)
    done()
})

/**
 * Приватные маршруты
 * Т.е те для которых нужна авторизация
 */
fastify.register((fastify: FastifyInstance, _, done: Function) => {
    fastify.addHook("onRequest", UserContoller.auth)
    fastify.register(userPrivateRoutes)
    done()
})

fastify.listen({port: 3000}, async (err, address) => {
    if(err) throw err

    /**
     * MongoDB connection
     */
    await mongoose.connect("mongodb://localhost:27017/test_app")

    console.log(`Server starting on: ${address}`)
})