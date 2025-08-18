import { trimTrailingSlash } from 'hono/trailing-slash'
import { createRoute } from 'honox/factory'

export default createRoute(trimTrailingSlash())
