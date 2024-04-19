import proxy from 'express-http-proxy'
import env from '@webbff/config/env'

/**
 * This is a proxy that forwards requests to the Customer Service.
 */
export const customerProxy = proxy(env.BASEURL_CUSTOMER!, {
  proxyReqPathResolver: function (req) {
    return req.originalUrl
  },
})
