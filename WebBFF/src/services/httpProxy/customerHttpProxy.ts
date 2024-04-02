import proxy from 'express-http-proxy'
import env from '@webbff/config/env'
import { CustomerDto, CustomerWebBFFDto } from '@api/generated'
import { convertCustomer } from '../converters/customerConverterService'

/**
 * This is a proxy that forwards requests to the BookService.
 */
export const customerProxy = proxy(env.BASEURL!, {
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    if (proxyRes.statusCode && proxyRes.statusCode < 400) {
      const webBffCustomer: CustomerWebBFFDto = convertCustomer(
        JSON.parse(proxyResData.toString()) as CustomerDto,
      )
      return Promise.resolve(JSON.stringify(webBffCustomer))
    }
    return Promise.resolve(proxyResData)
  },
  proxyReqPathResolver: function (req) {
    return '/customers' + req.url
  },
})
