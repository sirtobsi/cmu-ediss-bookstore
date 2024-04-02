import proxy from 'express-http-proxy'
import env from '../../config/env'
import { CustomerDto, CustomerWebBFFDto } from '@api/generated'
import { convertCustomer } from '../converters/customerConverterService'

/**
 * This is a proxy that forwards requests to the BookService.
 */
export const customerProxy = proxy(env.BASEURL!, {
  userResDecorator: function (
    proxyRes,
    proxyResData: CustomerDto,
    userReq,
    userRes,
  ) {
    const webBffCustomer: CustomerWebBFFDto = convertCustomer(proxyResData)
    return JSON.stringify(webBffCustomer)
  },
})
