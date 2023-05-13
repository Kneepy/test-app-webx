import { FastifyRequest } from "fastify"

declare module "fastify" {
    interface FastifyRequest {
        user_id?: string
    }
}

export interface UserRequest {
    user_id: string
}