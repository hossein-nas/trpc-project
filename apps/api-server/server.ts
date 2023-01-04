import { initTRPC } from '@trpc/server'
import z from 'zod'
import * as trpcExpress from '@trpc/server/adapters/express'

import express from 'express'

import cors from 'cors'
import { createPost } from './posts'
const t = initTRPC.create()

const appRouter = t.router({
    hello: t.procedure.input(z.string().nullish()).query((req) => {
        return `hello ${req.input ?? 'world'}`
    }),
})

export type AppRouter = typeof appRouter

async function server() {
    // express implementation
    const app = express()
    app.use(cors())
    app.use((req, _res, next) => {
        // request logger
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query)

        next()
    })

    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
        })
    )
    app.get('/', (_req, res) => res.send('hello'))
    app.listen(2021, () => {
        console.log('listening on port 2021')
    })
}

server()
