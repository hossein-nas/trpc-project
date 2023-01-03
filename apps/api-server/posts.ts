import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type PostPayload = Omit<Prisma.PostGetPayload<{}>, 'id'>

export const createPost = async (post: PostPayload) => {
    await prisma.post.create({ data: post })
}
