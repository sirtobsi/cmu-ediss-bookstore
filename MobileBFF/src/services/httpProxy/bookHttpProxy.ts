import proxy from 'express-http-proxy'
import env from '../../config/env'
import { BookDto, BookMobileBFFDto } from '@api/generated'
import { convertBook } from '../converters/bookConverter'

/**
 * This is a proxy that forwards requests to the BookService.
 */
export const bookProxy = proxy(env.BASEURL!, {
  userResDecorator: function (
    proxyRes,
    proxyResData: BookDto,
    userReq,
    userRes,
  ) {
    const mobileBffBook: BookMobileBFFDto = convertBook(proxyResData)
    return JSON.stringify(mobileBffBook)
  },
})
