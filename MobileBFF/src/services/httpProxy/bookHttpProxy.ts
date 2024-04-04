import proxy from 'express-http-proxy'
import env from '../../config/env'
import { BookMobileBFFDto } from '@api/generated'
import { convertBook } from '../converters/bookConverter'
import logger from '@common/middleware/logger/logger'

/**
 * This is a proxy that forwards requests to the BookService and converts the result for GET requests.
 */
export const bookGETProxy = proxy(env.BASEURL!, {
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    logger.info(`Proxying request to ${env.BASEURL!}; status code ${proxyRes?.statusCode}`)
    if (proxyRes?.statusCode && proxyRes.statusCode < 400) {
      const mobileBffBook: BookMobileBFFDto = convertBook(JSON.parse(proxyResData.toString()))
      return JSON.stringify(mobileBffBook)
    } else {
      return JSON.stringify(JSON.parse(proxyResData))
    }
  },
  proxyReqPathResolver: function (req) {
    return req.originalUrl
  },
})

/**
 * This is a proxy that forwards requests to the BookService.
 */
export const bookProxy = proxy(env.BASEURL!, {
  proxyReqPathResolver: function (req) {
      return req.originalUrl
    },
})
