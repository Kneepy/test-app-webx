import { FastifyRequest } from "fastify";
import { SavePostDTO } from "../dtos/post-dtos/save-post.dto";
import { GetPostDTO, GetPostsDTO } from "../dtos/post-dtos/get-post.dto";
import mongoose from "mongoose";
import { PostModel } from "../models/post.model";
import { BaseException } from "../exceptions/base.exception";
import { CANNOT_EDIT_POST, DEFAULT_TAKE_POSTS } from "../constants";

class PostController {
    async getOne({ query }: FastifyRequest<GetPostDTO>) {
        const { id } = query

        return await PostModel.findById(id).populate("user")
    }
    async getMePosts({ query, user_id }: FastifyRequest<GetPostsDTO>) {
        const { take = DEFAULT_TAKE_POSTS, skip = 0 } = query

        return await PostModel.find({ user: new mongoose.Types.ObjectId(user_id)}).limit(take).skip(skip)
    }
    async create({ body, user_id }: FastifyRequest<SavePostDTO>) {
        const { title, media } = body

        return await PostModel.create({title, media, user: user_id})
    }
    async update({ body, query, user_id }: FastifyRequest<SavePostDTO>) {
        const { title, media } = body
        const { id } = query

        const post = await PostModel.findById(id)

        if(post.user._id.toString() !== user_id) throw BaseException.BadRequest(CANNOT_EDIT_POST)
        
        return await PostModel.findByIdAndUpdate(id, { title: title ?? post.title, media: media ?? post.media })
    }
}

export default new PostController()