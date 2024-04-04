import proxy from 'express-http-proxy'
import env from '@mobilebff/config/env'
import { CustomerWebBFFDto } from '@api/generated'
import { convertCustomer } from '../converters/customerConverterService'
import logger from '@common/middleware/logger/logger'

/**
 * This is a proxy that forwards requests to the BookService and converts the result for GET requests.
 */
export const customerGETProxy = proxy(env.BASEURL!, {
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    logger.info(`Proxying request to ${env.BASEURL!}; status code ${proxyRes?.statusCode}`)
    if (proxyRes?.statusCode && proxyRes.statusCode < 400) {
      const webBffCustomer: CustomerWebBFFDto = convertCustomer(
        JSON.parse(proxyResData.toString()),
      )
      return JSON.stringify(webBffCustomer)
    } else {
      return JSON.stringify(JSON.parse(proxyResData))
    }
  },
  proxyReqPathResolver: function (req) {
    return '/customers' + req.url
  },
})

/**
 * This is a proxy that forwards requests to the BookService
 */
export const customerProxy = proxy(env.BASEURL!, {
  proxyReqPathResolver: function (req) {
    return '/customers' + req.url
  },
})
