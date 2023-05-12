import Fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import FastifyCookie from "@fastify/cookie";
import { privatePostRoutes, privateUserRoutes, publicPostRoutes, publicUserRoutes } from "./routes";
import UserContoller from "./controllers/user.contoller";
import { BaseException } from "./exceptions/base.exception";
import cors from "@fastify/cors"

const fastify = Fastify({
    logger: false
})

fastify.register(FastifyCookie, {parseOptions: {}, secret: "test"})
fastify.register(cors)

fastify.register((fastify: FastifyInstance, _, done: Function) => {
    /**
     * Маршруты общей области видимости
     * Т.е те для которых не нужна авторизация
     */
    fastify.register((fastify: FastifyInstance, _, done: Function) => {
        fastify.register(publicUserRoutes)
        fastify.register(publicPostRoutes)

        done()
    })

    /**
     * Приватные маршруты
     * Т.е те для которых нужна авторизация
     */
    fastify.register((fastify: FastifyInstance, _, done: Function) => {
        fastify.addHook("onRequest", UserContoller.auth)

        fastify.register(privateUserRoutes)
        fastify.register(privatePostRoutes)

        done()
    })

    done()
})

fastify.setErrorHandler((err, _, reply) => {
    console.log(err)
    if(err instanceof BaseException) {
        return reply.status(err.status).send({ status: err.status, message: err.message, errors: err.errors ?? [] })
    } 
    return reply.status(500).send({ message: "Internal server error" })
})

fastify.listen({port: 3000}, async (err, address) => {
    if(err) console.log(err)

    /**
     * MongoDB connection
     */ 
    await mongoose.connect("mongodb://localhost:27017/test_app")

    console.log(`Server starting on: ${address}`)
})