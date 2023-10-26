import { useException } from "@src/utils/exception.util"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"
import { PrismaClient } from "prisma/prisma-client"

// parse model
const { post: Post } = new PrismaClient()

// types
interface RequestPost extends Request {
    query: {
        page: string
    }
}

export const PostController = {

    // handler: get all post by default published status is true
    async index(req: RequestPost, res: Response): Promise<Response | void> {

        // parse params
        let { page } = req.query

        try {
            // query
            const posts = await Post.findMany({
                where: {
                    isPublished: true,
                },
                take: 10,
                skip: page ? parseInt(page) * 10 : 0,
                select: {
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select: {
                            name: true,
                            profile: {
                                select: {
                                    picture: true
                                }
                            }
                        }
                    },
                    comments: {
                        select: {
                            content: true,
                            author: { select: { name: true } }
                        }
                    }
                }
            })

            //query: count all post
            const postCounter = await Post.count({
                where: {
                    isPublished: true
                }
            })

            // OK
            return res.status(HttpStatusCode.OK).send({
                status: true,
                code: HttpStatusCode.OK,
                data: {
                    page: {
                        current: page ? parseInt(page) : 1,
                        total: Math.floor(postCounter / 10),
                        items: posts.length
                    },
                    posts
                }
            } as JSONResponse)
        } catch (err: any) { useException(err, res) }
    }
}