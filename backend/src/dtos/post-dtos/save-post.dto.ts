import { UserRequest } from "../../types/custom-request.type"
import { Post } from "../../models/post.model"

export interface SavePostDTO extends UserRequest {
    Body: Omit<Post, "user" | "createdAt">
    Querystring: {
        id: string
    }
}
