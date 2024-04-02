import proxy from 'express-http-proxy'
import env from '../../config/env'

/**
 * This is a proxy that forwards requests to the BookService.
 */
export const bookProxy = proxy(env.BASEURL!, {
    proxyReqPathResolver: function (req) {
        return '/books' + req.url
      },
})
