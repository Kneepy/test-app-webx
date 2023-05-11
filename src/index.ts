import Fastify from "fastify";
import mongoose from "mongoose";

const fastify = Fastify({
    logger: false
})

fastify.listen({port: 3000}, async (err, address) => {
    if(err) throw err

    /**
     * MongoDB connection
     */
    await mongoose.connect("mongodb://localhost:27017/test_app")

    console.log(`Server starting on: ${address}`)
})