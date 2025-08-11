import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'

const app = new Hono()

app.use(contextStorage())
