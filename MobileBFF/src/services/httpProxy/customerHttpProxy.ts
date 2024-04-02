import proxy from 'express-http-proxy'
import env from '../../config/env'

/**
 * This is a proxy that forwards requests to the Customer Service.
 */
export const customerProxy = proxy(env.BASEURL!, {
  proxyReqPathResolver: function (req) {
    return '/customers' + req.url
  },
})
