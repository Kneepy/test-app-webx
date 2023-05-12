import { UserRequest } from "../../types/custom-request.type"

export interface GetPostsDTO extends UserRequest {
    Querystring: {
        take?: number,
        skip?: number
    }
}

export interface GetPostDTO {
    Querystring: {
        id: string
    }
}